import { Editor } from 'slate-react'
import Html from 'slate-html-serializer'
import { Value } from 'slate'
import React from 'react'
import './slateCss/slate.module.scss'
import initialValue from './value.json'
import { RULES } from './slateHtmlSerializer/slateHtmlSerializer'
import toolbar from './toolbar'
import { schema } from './schema'
import renderBlock from './plugins/renderConmonBlock'
import onKeyDown from './plugins/onKeyDown'
import renderCommonMark from './plugins/renderCommonMark'
import onDropOrPaste from './plugins/onDropOrPaste'

const serializer = new Html({ rules: RULES })

// function isImage (url) {
//     return imageExtensions.includes(getExtension(url))
// }

// function getExtension (url) {
//     return new URL(url).pathname.split('.').pop()
// }
/**
 * 定义默认 node type.
 *
 * @type {String}
 */

/**
 *
 * @type {Component}
 */

class RichTextExample extends React.Component {
    /**
   * 解析数据.后面处理html形式
   *
   * @type {Object}
   */

  state = {
      value: localStorage.getItem('content') ? serializer.deserialize(localStorage.getItem('content')) : Value.fromJSON(initialValue),
  }

  plugins = [
      {
          queries: {
              isEmpty: editor => editor.value.document.text === '',
          },
      },
      renderBlock,
      onKeyDown,
      renderCommonMark,
      ...onDropOrPaste
  ]

  /**
   *  `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
      this.editor = editor
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render () {
      return (
          <div className='slate-cjfed' styleName='slate-cjfed'>
              {
                  toolbar.call(this)
              }

              <Editor
                spellCheck
                autoFocus
                ref={this.ref}
                value={this.state.value}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                // renderBlock={this.renderBlock}
                // renderMark={this.renderMark}
                // renderNode={this.renderNode}
                // onDrop={this.onDropOrPaste}
                // onPaste={this.onDropOrPaste}
                schema={schema}
                placeholder='请输入点东西？'
                plugins={this.plugins}
              />
          </div>
      )
  }

  /**
   * --------------------------------------------------------各种事件相关-------有空再分离这些吧--------------------------------------------------------------------
   */

  /**
   * On change, 保存~~更新 `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
      const content = serializer.serialize(value.toJSON()).replace(/data-style/g, 'style')
      localStorage.setItem('content', content)
      this.setState({ value })
  }

  /**
   * 转换mark类型.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
      event.preventDefault()
      this.editor.toggleMark(type)
  }

  /**
   * 左右中系列~
   * @param {Event} event
   * @param {String} type
   */
  onClickRTL=(event, type) => {
      event.preventDefault()
      const { editor } = this
      const { value } = editor
      //   const isActive = this.hasBlock(type)
      //   editor.setBlocks(isActive ? DEFAULT_NODE : type).wrapBlock(type)
      const currentBlockType = value.blocks.first().type
      //   if (['heading-one', 'heading-two', 'heading-three'].includes(currentBlockType)) {
      //       editor.setBlocks({
      //           type: currentBlockType,
      //           data: { style: `text-align:${type};` }
      //       })
      //   } else {
      //       editor.setBlocks({
      //           type: 'alignment',
      //           data: { style: `text-align:${type};`, currentBlockType }
      //       }).focus()
      //   }
      editor.setBlocks({
          type: currentBlockType,
          data: { style: `text-align:${type};` }
      })
  }

  /**
   * 前一步 history.
   *
   */
  onClickRedo = event => {
      event.preventDefault()
      this.editor.redo()
  }

  /**
   * 后一步 history.
   *
   */

  onClickUndo = event => {
      event.preventDefault()
      this.editor.undo()
  }
}

/**
 * Export.
 */

export default RichTextExample
