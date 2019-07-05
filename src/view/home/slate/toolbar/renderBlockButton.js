import React from 'react'
import { Button, Icon } from '../simpleConponent/components'
import { hasBlock } from '../utils'
import onClickBlock from '../change/onClickBlock'
/**
   * Render 转换段落按钮
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

export default function (type, icon, remarks) {
    let isActive = hasBlock.call(this, type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
        const { value: { document, blocks } } = this.state

        if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key)
            isActive = hasBlock.call(this, 'list-item') && parent && parent.type === type
        }
    }

    return (
        <Button
          active={isActive}
          onMouseDown={event => onClickBlock(event, type, this)}
        >
            <Icon remarks={remarks}>{icon}</Icon>
        </Button>
    )
}
