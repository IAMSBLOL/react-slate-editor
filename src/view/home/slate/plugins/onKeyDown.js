/**
 *
 * @type {Function}
 */
import { isKeyHotkey } from 'is-hotkey'
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')
const onKeyDown = (event, editor, next) => {
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
export default {
    onKeyDown
}
