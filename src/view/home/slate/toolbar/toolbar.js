import React from 'react'
import { TITLE_SIZE } from '../constant/selectOption' // FONT_SIZE
import { Toolbar } from '../simpleConponent/components'
import renderMarkButton from './renderMarkButton'
import renderHistoryButton from './renderHistoryButton'
import renderColorMarkButton from './renderColorMarkButton'
import renderBlockButton from './renderBlockButton'
import renderImageButton from './renderImageButton'
import renderRTLButton from './renderRTLButton'
import renderSelect from './renderSelect'
/**
 * function
 */
import setTitle from '../change/setTitle'

export default function () {
    const { editor } = this
    return (
        <Toolbar>
            {renderHistoryButton.call(this, 'undo', 'undo', '上一步', this.onClickUndo)}
            {renderHistoryButton.call(this, 'redo', 'redo', '下一步', this.onClickRedo)}
            {renderMarkButton.call(this, 'bold', 'format_bold', '加粗')}
            {renderMarkButton.call(this, 'italic', 'format_italic', '斜体')}
            {renderMarkButton.call(this, 'underlined', 'format_underlined', '下划线')}
            {renderColorMarkButton.call(this, 'font-color', 'format_color_text', '字体颜色', '选择字体颜色')}
            {renderColorMarkButton.call(this, 'background-color', 'format_color_fill', '背景颜色', '选择背景颜色')}
            {renderBlockButton.call(this, 'numbered-list', 'format_list_numbered', '有序列表')}
            {renderBlockButton.call(this, 'bulleted-list', 'format_list_bulleted', '无序列表')}
            {renderImageButton.call(this, 'image', 'image', '图片')}
            {renderRTLButton.call(this, 'left', 'format_align_left', '居左')}
            {renderRTLButton.call(this, 'center', 'format_align_justify', '居中')}
            {renderRTLButton.call(this, 'right', 'format_align_right', '居右')}
            {renderSelect.call(this, 'title', '标题号', (type) => setTitle(type, editor, this), TITLE_SIZE)}
        </Toolbar>
    )
}
