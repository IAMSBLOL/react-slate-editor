import React from 'react'
import { Upload } from 'antd'
import { Icon } from '../simpleConponent/components'
import { css, cx } from 'emotion'
/**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
export default function (type, icon, remarks) {
    return (
        <Upload
          onMouseDown={event => this.insertImage(event, type)}
      >

            <Icon remarks={remarks} className={cx(
                css`cursor: pointer; color: ${'#ccc'};`
            )} >{icon}</Icon>
        </Upload>
    )
}
