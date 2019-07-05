import React from 'react'
import { Button, Icon } from '../simpleConponent/components'

/**
   *
   * @param {String} type
   * @param {String} icon
   * @param {Any} remarks （）
   * @return {Element}
   */
export default function (type, icon, remarks, bindClick) {
    const { value } = this.state
    const { data } = value
    const dos = remarks === 'undos' ? data.get('undos') : data.get('redos')
    return (
        <Button onMouseDown={bindClick} active={dos && dos.size !== 0}>
            <Icon remarks={remarks}>{icon}</Icon>
        </Button>
    )
}
