/**
   * 黏贴------核心插件
   *
   *
   */
import { getEventTransfer } from 'slate-react'
import Html from 'slate-html-serializer'
import { RULES } from '../slateHtmlSerializer/slateHtmlSerializer'
const serializer = new Html({ rules: RULES })
function insertImage (editor, src, target) {
    if (target) {
        editor.select(target)
    }

    editor.insertBlock({
        type: 'image',
        data: { src },
    })
}

const onDropOrPaste = (event, editor, next) => {
    const target = editor.findEventRange(event)
    if (!target && event.type === 'drop') return next()

    const transfer = getEventTransfer(event)
    const { type, files } = transfer

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
    // 那就禁止自定义解析吧，垃圾
    if (transfer.type === 'html') {
        console.warn('html', transfer)
        const { document } = serializer.deserialize(transfer.html)
        editor.insertFragment(document)
    }
    // 很智障的问题，next会重新解析
    next()
}

export default [{ onDrop: onDropOrPaste }, { onPaste: onDropOrPaste }]
