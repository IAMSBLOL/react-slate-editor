/**
   * Render 处理slate格式.一整块
   *
   * @param {Object} props
   * @return {Element}
   */
import React from 'react'
import { css, cx } from 'emotion'
const renderBlock = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props
    console.log(props, 11)
    switch (node.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes} >{children}</ul>
        case 'heading-one':
            return <h1 {...attributes} className={cx(

                css`${node.data.get('style')}`
            )}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes} className={cx(

                css`${node.data.get('style')}`
            )}>{children}</h2>
        case 'heading-three':
            return <h3 {...attributes} className={cx(

                css`${node.data.get('style')}`
            )}>{children}</h3>

        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        // case 'alignment':
        //     // 注意的是，这个是普通文本的对齐，至于特定的比如h1之类的有独特处理(未做处理)
        //     return <AlignmentNode {...props} />
        case 'image': {
            const src = node.data.get('src')
            return (
                <img
                  {...attributes}
                  src={src}
                  className={css`
                    display: block;
                    max-width: 100%;
                    max-height: 20em;
                    box-shadow: ${isFocused ? '0 0 0 2px #ccc;' : 'none'};
                  `}
                />
            )
        }
        default:
            return next()
    }
}

export default {
    renderBlock
}
