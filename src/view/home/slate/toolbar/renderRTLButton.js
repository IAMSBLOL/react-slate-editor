import React from 'react'
import { Button, Icon } from '../simpleConponent/components'
import { hasBlock } from '../utils'

/**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

export default function (type, icon, remarks) {
    let isActive = hasBlock.call(this, type)

    return (
        <Button
          active={isActive}
          onMouseDown={event => this.onClickRTL(event, type)}
          >
            <Icon remarks={remarks}>{icon}</Icon>
        </Button>
    )
}
