/**
   * Render Slate mark. 一小块的处理
   *
   * @param {Object} props
   * @return {Element}
   */

import React from 'react'

import { FontColorMark, FontBackgroundColorMark } from '../simpleConponent/components'

const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props
    //   console.log(props, 'props')
    switch (mark.type) {
        case 'bold':
            return <strong {...attributes}>{children}</strong>
        case 'code':
            return <code {...attributes}>{children}</code>
        case 'italic':
            return <em {...attributes}>{children}</em>
        case 'underlined':
            return <u {...attributes}>{children}</u>
        // case 'font-size':
        //     return <FontSzieMark {...props} />
        case 'font-color':
            return <FontColorMark {...props} />
        case 'background-color':
            return <FontBackgroundColorMark {...props} />
        default:
            return next()
    }
}

export default {
    renderMark
}
