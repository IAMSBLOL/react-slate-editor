import loadable from '@loadable/component'

// const LoadableComponent = (importComponent) => {
//     return Loadable({
//         loader: importComponent,
//         loading: () => '....'
//     });
// }

/**
 * 路由配置
 */
const routes = [
    {
        path: '/',
        component: loadable(() => import('./view/home/discribtion')),
    }
]

export default routes;
