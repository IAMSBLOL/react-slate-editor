/**
   * 设置字体颜色
   */
const setFontColorMark = (color, editor) => {
    const { value } = editor
    const hasFontMark = value.marks.some(mark => mark.type === 'font-color')
    const getFontMark = value.marks.filter(mark => mark.type === 'font-color').first()
    const { selection } = value
    //   console.log(selection, 'selection')

    // 选中替换~~~自动替换的没开发出来
    if (selection.isExpanded) {
        if (hasFontMark) {
            editor
                .removeMark(getFontMark)
                .addMark({
                    type: 'font-color',
                    data: { style: `color:${color};` },
                })
        } else {
            editor
                .addMark({
                    type: 'font-color',
                    data: { style: `color:${color};` },
                })
        }
    } else {

    }
}

export default setFontColorMark
