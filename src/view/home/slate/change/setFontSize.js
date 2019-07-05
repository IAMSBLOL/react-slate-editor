
/**
   * 设置字体mark
   */
const setFontSize = (fontSize) => {
    const { editor } = this
    const { value } = editor
    const hasFontMark = value.marks.some(mark => mark.type === 'font-size')
    const getFontMark = value.marks.filter(mark => mark.type === 'font-size').first()
    const { selection } = value
    //   console.log(selection, 'selection')

    // 选中替换~~~自动替换的没开发出来
    if (selection.isExpanded) {
        if (hasFontMark) {
            editor
                .removeMark(getFontMark)
                .addMark({
                    type: 'font-size',
                    data: { style: `font-size:${fontSize}px` },
                })
        } else {
            editor.addMark({
                type: 'font-size',
                data: { style: `font-size:${fontSize}px` },
            })
        }
    } else {
        console.info('库里吉娃阿里嘎多')
        //   editor.setBlocks({
        //       type: 'font-size',
        //       data: { fontSize },
        //   })
    }
}

export default setFontSize
