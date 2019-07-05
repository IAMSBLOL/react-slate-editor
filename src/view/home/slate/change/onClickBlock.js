/**
   * 换block类型.
   *
   * @param {Event} event
   * @param {String} type
   */
import { DEFAULT_NODE } from '../constant/DEFAULT_NODE'
import { hasBlock } from '../utils'

const onClickBlock = (event, type, _this) => {
    event.preventDefault()
    console.log(_this)
    const { editor } = _this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
        const isActive = hasBlock.call(_this, type)
        const isList = hasBlock.call(_this, 'list-item')

        if (isList) {
            editor
                .setBlocks(isActive ? DEFAULT_NODE : type)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
        } else {
            editor.setBlocks(isActive ? DEFAULT_NODE : type)
        }
    } else {
    // Handle the extra wrapping required for list buttons.
        const isList = hasBlock.call(_this, 'list-item')
        const isType = value.blocks.some(block => {
            return !!document.getClosest(block.key, parent => parent.type === type)
        })

        if (isList && isType) {
            editor
                .setBlocks(DEFAULT_NODE)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
        } else if (isList) {
            editor
                .unwrapBlock(
                    type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                )
                .wrapBlock(type)
        } else {
            editor.setBlocks('list-item').wrapBlock(type)
        }
    }
}

export default onClickBlock
