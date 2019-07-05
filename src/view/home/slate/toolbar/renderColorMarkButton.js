import React from 'react'
import { Button, Icon } from '../simpleConponent/components'
import { hasMark } from '../utils'
import { Popover } from 'antd'
import setBackgroundColorMark from '../change/setBackgroundColorMark'
import setFontColorMark from '../change/setFontColorMark'
import ColorPicker from '../ColorPicker'
/**
   *
   */
export default function (type, icon, remarks, title) {
    const isActive = hasMark.call(this, type)
    const { editor } = this
    const onComplete = type === 'font-color' ? (color) => setFontColorMark(color, editor) : (backgroundColor) => setBackgroundColorMark(backgroundColor, editor)
    const content = <ColorPicker onComplete={onComplete} />
    return (
        <Popover title={title} content={content} overlayStyle={{ width: 250 }} getPopupContainer={(node) => {
            return node
        }}>
            <Button
              active={isActive}
              onMouseDown={event => void 0}
              >
                <Icon remarks={remarks}>{icon}</Icon>
            </Button>
        </Popover>
    )
}
