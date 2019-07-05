import { DEFAULT_NODE } from '../constant/DEFAULT_NODE'
import { hasBlock } from '../utils'

const setTitle = (type, editor, _this) => {
    const isActive = hasBlock.call(_this, type)
    editor.setBlocks(isActive ? DEFAULT_NODE : type).focus()
}

export default setTitle
