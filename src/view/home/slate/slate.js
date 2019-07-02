import { Editor, getEventTransfer } from 'slate-react'
import Html from 'slate-html-serializer'
import { Value, Block } from 'slate'
import { css, cx } from 'emotion'
import React from 'react'
import './slate.module.scss'
// import './font.css'
import { Upload } from 'antd'
import initialValue from './value.json'
import { isKeyHotkey } from 'is-hotkey'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { Button, Icon, Toolbar, AlignmentNode, SlateSelect, FontSzieMark, FontSzieNode } from './components'
import { RULES } from './slateHtmlSerializer'
import { TITLE_SIZE, FONT_SIZE } from './selectOption'
// import PlaceholderPlugin from 'slate-react-placeholder'

const serializer = new Html({ rules: RULES })

function isImage (url) {
    return imageExtensions.includes(getExtension(url))
}

function getExtension (url) {
    return new URL(url).pathname.split('.').pop()
}

function insertImage (editor, src, target) {
    if (target) {
        editor.select(target)
    }

    editor.insertBlock({
        type: 'image',
        data: { src },
    })
}
/**
 * 定义默认 node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'

/**
 * 操蛋的模块自定义
 */

const schema = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    blocks: {
        image: {
            isVoid: true,
        },
    },
}

/**
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

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
      value: Value.fromJSON(initialValue),
  }

  plugins = [
      {
          queries: {
              isEmpty: editor => editor.value.document.text === '',
          },
      },
      //   PlaceholderPlugin({
      //       placeholder: '请输入点东西!',
      //       when: 'isEmpty',
      //       style: { color: '#999', opacity: '1', fontFamily: 'monospace' },
      //   }),
  ]

  /**
   * 是否mark `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
      const { value } = this.state
      return value.activeMarks.some(mark => mark.type === type)
  }

  /**
   * 是否 block `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
      const { value } = this.state
      return value.blocks.some(node => node.type === type)
  }

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
              <Toolbar>
                  {this.renderHistoryButton('undo', 'undo', '上一步', this.onClickUndo)}
                  {this.renderHistoryButton('redo', 'redo', '下一步', this.onClickRedo)}
                  {this.renderMarkButton('bold', 'format_bold', '加粗')}
                  {this.renderMarkButton('italic', 'format_italic', '斜体')}
                  {this.renderMarkButton('underlined', 'format_underlined', '下划线')}
                  {/* {this.renderMarkButton('code', 'code', '代码')} */}
                  {/* {this.renderBlockButton('heading-one', 'looks_one', '标题1')}
                  {this.renderBlockButton('heading-two', 'looks_two', '标题2')} */}
                  {/* {this.renderBlockButton('block-quote', 'format_quote', '块')} */}
                  {this.renderBlockButton('numbered-list', 'format_list_numbered', '有序列表')}
                  {this.renderBlockButton('bulleted-list', 'format_list_bulleted', '无序列表')}
                  {this.renderImageButton('image', 'image', '图片')}
                  {this.renderRTLButton('left', 'image', '居左')}
                  {this.renderRTLButton('center', 'image', '居中')}
                  {this.renderRTLButton('right', 'image', '居右')}
                  {this.renderSelect('title', '标题号', this.setTitle, TITLE_SIZE)}
                  {this.renderSelect('font-size', '字体大小', this.setFontSize, FONT_SIZE, 1)}
              </Toolbar>
              <Editor
                spellCheck
                autoFocus
                ref={this.ref}
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderBlock={this.renderBlock}
                renderMark={this.renderMark}
                renderNode={this.renderNode}
                onDrop={this.onDropOrPaste}
                onPaste={this.onDropOrPaste}
                schema={schema}
                placeholder='请输入点东西？'
                plugins={this.plugins}
              />
          </div>
      )
  }

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @param {Any} remarks （）
   * @return {Element}
   */
  renderSelect=(type, remarks, bindClick, data, index = 0) => {
      return (
          <SlateSelect remarks={remarks} onChange={bindClick} data={data} defaultValue={data[index]['key']} />
      )
  }

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @param {Any} remarks （）
   * @return {Element}
   */
  renderHistoryButton=(type, icon, remarks, bindClick) => {
      const { value } = this.state
      const { data } = value
      const dos = remarks === 'undos' ? data.get('undos') : data.get('redos')
      //   console.log(dos, 'caoniam')
      return (
          <Button onMouseDown={bindClick} active={dos && dos.size !== 0}>
              <Icon remarks={remarks}>{icon}</Icon>
          </Button>
      )
  }

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderImageButton=(type, icon, remarks) => {
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

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon, remarks) => {
      const isActive = this.hasMark(type)

      return (
          <Button
            active={isActive}
            onMouseDown={event => this.onClickMark(event, type)}
          >
              <Icon remarks={remarks}>{icon}</Icon>
          </Button>
      )
  }

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderRTLButton = (type, icon, remarks) => {
      const isActive = this.hasMark(type)

      return (
          <Button
            active={isActive}
            onMouseDown={event => this.onClickRTL(event, type)}
            >
              <Icon remarks={remarks}>{icon}</Icon>
          </Button>
      )
  }

  /**
   * Render 转换段落按钮
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon, remarks) => {
      let isActive = this.hasBlock(type)

      if (['numbered-list', 'bulleted-list'].includes(type)) {
          const { value: { document, blocks } } = this.state

          if (blocks.size > 0) {
              const parent = document.getParent(blocks.first().key)
              isActive = this.hasBlock('list-item') && parent && parent.type === type
          }
      }

      return (
          <Button
            active={isActive}
            onMouseDown={event => this.onClickBlock(event, type)}
          >
              <Icon remarks={remarks}>{icon}</Icon>
          </Button>
      )
  }

  /**
   * Render 处理slate格式.一整块
   *
   * @param {Object} props
   * @return {Element}
   */

  renderBlock = (props, editor, next) => {
      const { attributes, children, node, isFocused } = props
      console.log(props, 254)
      switch (node.type) {
          case 'block-quote':
              return <blockquote {...attributes}>{children}</blockquote>
          case 'bulleted-list':
              return <ul {...attributes}>{children}</ul>
          case 'heading-one':
              return <h1 {...attributes}>{children}</h1>
          case 'heading-two':
              return <h2 {...attributes}>{children}</h2>
          case 'heading-three':
              return <h3 {...attributes}>{children}</h3>
          case 'heading-four':
              return <h4 {...attributes}>{children}</h4>
          case 'heading-five':
              return <h5 {...attributes}>{children}</h5>
          case 'list-item':
              return <li {...attributes}>{children}</li>
          case 'numbered-list':
              return <ol {...attributes}>{children}</ol>
          case 'alignment':
              return <AlignmentNode {...props} />
          case 'font-size':
              return <FontSzieNode {...props} />
          case 'image': {
              const src = node.data.get('src')
              return (
                  <img
                    {...attributes}
                    src={src}
                    className={css`
                      display: block;
                      max-width: 100%;
                      max-height: 20em;
                      box-shadow: ${isFocused ? '0 0 0 2px blue;' : 'none'};
                    `}
                  />
              )
          }
          default:
              return next()
      }
  }

  /**
   * Render Slate mark. 一小块的处理
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
      const { children, mark, attributes } = props
      console.log(props, 'props')
      switch (mark.type) {
          case 'bold':
              return <strong {...attributes}>{children}</strong>
          case 'code':
              return <code {...attributes}>{children}</code>
          case 'italic':
              return <em {...attributes}>{children}</em>
          case 'underlined':
              return <u {...attributes}>{children}</u>
          case 'font-size':
              return <FontSzieMark {...props} />
          default:
              return next()
      }
  }

  /**
   * On change, 保存~~更新 `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
      //   const content = serializer.serialize(value.toJSON())
      //   localStorage.setItem('content', content)
      this.setState({ value })
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  onKeyDown = (event, editor, next) => {
      let mark

      if (isBoldHotkey(event)) {
          mark = 'bold'
      } else if (isItalicHotkey(event)) {
          mark = 'italic'
      } else if (isUnderlinedHotkey(event)) {
          mark = 'underlined'
      } else if (isCodeHotkey(event)) {
          mark = 'code'
      } else {
          return next()
      }

      event.preventDefault()
      editor.toggleMark(mark)
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

      editor.setBlocks({
          type: 'alignment',
          data: { align: type, currentBlockType: value.blocks.first().type }
      }).focus()
  }

  /**
   * 换block类型.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
      event.preventDefault()

      const { editor } = this
      const { value } = editor
      const { document } = value

      // Handle everything but list buttons.
      if (type !== 'bulleted-list' && type !== 'numbered-list') {
          const isActive = this.hasBlock(type)
          const isList = this.hasBlock('list-item')

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
          const isList = this.hasBlock('list-item')
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

  /**
   * 黏贴
   */
  onDropOrPaste = (event, editor, next) => {
      const target = editor.findEventRange(event)
      if (!target && event.type === 'drop') return next()

      const transfer = getEventTransfer(event)
      const { type, text, files } = transfer

      if (type === 'files') {
          for (const file of files) {
              const reader = new FileReader()
              const [mime] = file.type.split('/')
              if (mime !== 'image') continue

              reader.addEventListener('load', () => {
                  editor.command(insertImage, reader.result, target)
              })

              reader.readAsDataURL(file)
          }
          return
      }

      if (type === 'text') {
          if (!isUrl(text)) return next()
          if (!isImage(text)) return next()
          editor.command(insertImage, text, target)
          return
      }

      if (transfer.type === 'html') {
          console.warn('t', transfer)
          const { document } = serializer.deserialize(transfer.html)
          editor.insertFragment(document)
      }

      next()
  }

  /**
   * insertImage
   */

  setTitle=(type) => {
      //   e.preventDefault()
      //   console.log(999, type)
      //   console.log(TAG, 888)
      const { editor } = this
      editor.setBlocks(type).focus()
  }

  /**
   * 设置字体mark
   */
  setFontSize=(size) => {
      const { editor } = this
      const { value } = editor
      const hasFontMark = value.marks.some(mark => mark.type === 'font-size')
      const getFontMark = value.marks.filter(mark => mark.type === 'font-size').first()
      const { selection } = value
      console.log(selection, 'selection')

      // 选中替换~~~自动替换的没开发出来
      if (selection.isExpanded) {
          if (hasFontMark) {
              editor
                  .removeMark(getFontMark)
                  .addMark({
                      type: 'font-size',
                      data: { size },
                  }).focus()
          } else {
              editor
                  .addMark({
                      type: 'font-size',
                      data: { size },
                  }).focus()
          }
      } else {
          console.info('库里吉娃阿里嘎多')
          editor.setBlocks({
              type: 'font-size',
              data: { size },
          })
      }
  }
}

/**
 * Export.
 */

export default RichTextExample
