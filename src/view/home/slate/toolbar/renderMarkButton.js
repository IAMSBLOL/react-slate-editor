import React from 'react'
import { Button, Icon } from '../simpleConponent/components'
import { hasMark } from '../utils'
/**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

export default function (type, icon, remarks) {
    const isActive = hasMark.call(this, type)

    return (
        <Button
          active={isActive}
          onMouseDown={event => this.onClickMark(event, type)}
        >
            <Icon remarks={remarks}>{icon}</Icon>
        </Button>
    )
}
