import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducer';
import { Iterable } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

// 优化一下提示信息。配合yf-helper的action.info（看下效果，如果效果不好再干掉）
function defaultTitleFormatter (action, time, took) {
    const parts = [];
    if (action.info) parts.push(`${String(action.info)}`);
    parts.push(`${String(action.type)}`);
    // 暂时先用不着下面这两个
    // if (time) parts.push(`触发时间:${String(time)}`);
    // if (took) parts.push(`(耗时: ${took.toFixed(3)} ms)`);
    return parts.join('    ')
}

const logger = createLogger({
    // duration: true, // 放到 defaultTitleFormatter 去控制了
    collapsed: true, // 还是展开了好
    titleFormatter: defaultTitleFormatter,
    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        }

        return newState;
    },
    actionTransformer: (action) => {
        let newAction = Object.assign({}, action);

        if (newAction.payload) {
            if (Iterable.isIterable(newAction.payload)) {
                newAction.payload = newAction.toJS();
            } else {
                for (var i of Object.keys(newAction.payload)) {
                    if (Iterable.isIterable(newAction.payload[i])) {
                        newAction.payload[i] = newAction.payload[i].toJS();
                    }
                }
            }
        }

        return newAction;
    }
});

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, thunk, logger, routerMiddleware(history)];

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                // ... other middlewares ...
                ...middleware,
            ),
        ),
    )

    if (module.hot) {
        module.hot.accept('../reducer', () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    sagaMiddleware.run(rootSaga)

    return store;
}

export default configureStore();
