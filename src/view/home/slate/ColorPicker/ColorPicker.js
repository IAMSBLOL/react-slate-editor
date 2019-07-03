import React from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import { cx, css } from 'emotion'

class ColorPicker extends React.Component {
    onChangeComplete =(color, event) => {
        // console.log(color.hex)
        this.props.onComplete(color.hex)
    }
    render () {
        const { className } = this.props
        return (
            <div className={cx(
                className,
                css`position: relative;`
            )}>
                <CompactPicker
                  onChangeComplete={this.onChangeComplete}
                />
            </div>
        )
    }
}
ColorPicker.propTypes = {
    className: PropTypes.string,
    onComplete: PropTypes.func
}
ColorPicker.defaultProps = {
    className: 'ColorPicker-cjfed',
    onComplete: () => void 0
}
export default ColorPicker
