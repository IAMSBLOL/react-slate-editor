import React, { Component } from 'react';
import './discribtion.module.scss';
import * as homeAction from '../../../action/globalAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Editor from '../slate'

class Discribtion extends Component {
    render () {
        return (
            <div styleName='discribtion' className='discribtion'>
                <Editor />
            </div>
        );
    }
}

Discribtion.propTypes = {
    home: PropTypes.string,
    homeAction: PropTypes.object,
    saga: PropTypes.string,
}

const mapStateToProps = (state) => {
    console.log(state, 26)
    const { home, saga } = state.homeReducer
    return {
        home, saga
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        homeAction: bindActionCreators(homeAction, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discribtion);
