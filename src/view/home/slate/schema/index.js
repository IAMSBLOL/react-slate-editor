/**
 * 操蛋的模块自定义
 */
import { Block } from 'slate'
export const schema = {
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
        'block-quote': {
            text: function (t) {
                // const __t = t.replace(/^\\\(|\\\)$/g, '');
                const MATHJAX_REGEX = /\\\(.*?\\\)|\$\$.*?\$\$|\\\[.*?\\\]/g;
                const _t = MATHJAX_REGEX.exec(t)
                console.log(_t, t)
                return t
            }
        }
    },
}
