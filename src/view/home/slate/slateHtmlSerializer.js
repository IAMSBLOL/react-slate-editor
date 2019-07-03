// slate这种开放式的编程style是真的很free skr skr
import React from 'react'
/**
 * 标签 to blocks.
 *
 * @type {Object}
 */

export const BLOCK_TAGS = {
    p: 'paragraph',
    li: 'list-item',
    ul: 'bulleted-list',
    ol: 'numbered-list',
    blockquote: 'block-quote',
    pre: 'code',
    h1: 'heading-one',
    h2: 'heading-two',
    h3: 'heading-three',
    h4: 'heading-four',
    h5: 'heading-five',
    h6: 'heading-six',
}

/**
   * 标签 to marks.
   *
   * @type {Object}
   */

export const MARK_TAGS = {
    strong: 'bold',
    em: 'italic',
    u: 'underlined',
    s: 'strikethrough',
    code: 'code'

}

/**
 * Serializer rules.
 *
 * @type {Array}
 */

export const RULES = [
    {
        deserialize (el, next) {
            const block = BLOCK_TAGS[el.tagName.toLowerCase()]

            if (block) {
                return {
                    object: 'block',
                    type: block,
                    nodes: next(el.childNodes),
                    data: {
                        style: el.getAttribute('style'),
                    }
                }
            }
        },
        // 这玩意有点东西，好像是取key而不是value吧
        serialize (object, children) {
            const index = Object.values(BLOCK_TAGS).findIndex((n) => n === object.type)
            if (object.object === 'block' && index !== -1) {
                const BLOCK_TAG = Object.keys(BLOCK_TAGS)[index]
                return <BLOCK_TAG>{children}</BLOCK_TAG>
            }
        }
    },
    {
        deserialize (el, next) {
            const tagName = el.tagName.toLowerCase()
            if (tagName && tagName === 'span') {
                // console.log(el.getAttribute('style'), 747474)
                const styleString = el.getAttribute('style')

                if (String(styleString).includes('font-size')) {
                    const mark = 'font-size'
                    const data = {
                        fontSize: String(styleString).split(':')[1]
                    }
                    console.log(String(styleString).split(':'), 888)
                    return {
                        object: 'mark',
                        type: mark,
                        nodes: next(el.childNodes),
                        data: data
                    }
                }
                if (String(styleString).includes('background-color')) {
                    const mark = 'background-color'
                    const data = {
                        backgroundColor: String(styleString).split(':')[1]
                    }
                    return {
                        object: 'mark',
                        type: mark,
                        nodes: next(el.childNodes),
                        data: data
                    }
                }

                if (String(styleString).includes('color')) {
                    const mark = 'font-color'
                    const data = {
                        color: String(styleString).split(':')[1]
                    }
                    return {
                        object: 'mark',
                        type: mark,
                        nodes: next(el.childNodes),
                        data: data
                    }
                }
            } else {
                const mark = MARK_TAGS[tagName]
                console.log(el)
                if (mark) {
                    return {
                        object: 'mark',
                        type: mark,
                        nodes: next(el.childNodes),
                        data: {
                            style: el.getAttribute('style'),
                        }
                    }
                }
            }
        },
        serialize (object, children) {
            const { type, data } = object

            // console.log(object, 'serializeMARK')

            if (['background-color', 'font-color', 'font-size'].includes(type)) {
                const styles = {
                    'background-color': { backgroundColor: data.backgroundColor },
                    'font-color': { color: data.color },
                    'font-size': { fontSize: data.fontSize }
                }
                return <span style={styles[type]}>{children}</span>
            }

            const index = Object.values(MARK_TAGS).findIndex((n) => n === type)

            if (object.object === 'mark' && index !== -1) {
                const MARK_TAG = Object.keys(MARK_TAGS)[index]
                return <MARK_TAG>{children}</MARK_TAG>
            }
        }
    },
    {
        // 代码块的特殊情况，需要获取嵌套的子节点~pre的代码？有点意思
        deserialize (el, next) {
            if (el.tagName.toLowerCase() === 'pre') {
                const code = el.childNodes[0]
                const childNodes = code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes

                return {
                    object: 'block',
                    type: 'code',
                    nodes: next(childNodes),
                }
            }
        },
        serialize (object, children) {
            const index = Object.values(BLOCK_TAGS).findIndex((n) => n === object.type)

            if (object.object === 'block' && index !== -1) {
                const MARK_TAG = Object.keys(BLOCK_TAGS)[index]
                return <MARK_TAG>{children}</MARK_TAG>
            }
        }
    },
    {
        // Special case for images, to grab their src.
        deserialize (el, next) {
            if (el.tagName.toLowerCase() === 'img') {
                return {
                    object: 'block',
                    type: 'image',
                    nodes: next(el.childNodes),
                    data: {
                        src: el.getAttribute('src'),
                    },
                }
            }
        },
        serialize (object, children) {
            if (object.object === 'block' && object.type === 'image') {
                return <img src={object.data.src} />
            }
        }
    },
    {
        // Special case for links, to grab their href.
        deserialize (el, next) {
            if (el.tagName.toLowerCase() === 'a') {
                return {
                    object: 'inline',
                    type: 'link',
                    nodes: next(el.childNodes),
                    data: {
                        href: el.getAttribute('href'),
                    },
                }
            }
        },
        serialize (object, children) {
            if (object.object === 'inline' && object.type === 'link') {
                return <a href={object.data.href}>{children}</a>
            }
        }
    },
]
