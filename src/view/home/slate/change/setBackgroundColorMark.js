/**
   * 设置段落背景颜色
   */
const setBackgroundColorMark = (backgroundColor, editor) => {
    const { value } = editor
    const hasBGMark = value.marks.some(mark => mark.type === 'background-color')
    const getBGMark = value.marks.filter(mark => mark.type === 'background-color').first()
    const { selection } = value

    //   const hasFontMark = value.marks.some(mark => mark.type === 'font-size')
    //   const getFontMark = value.marks.filter(mark => mark.type === 'font-size').first()
    //   console.log(hasFontMark, 'selection')
    //   console.log(getFontMark, 'selection')
    //   console.log(hasFontMark && getFontMark.data.get('style'), 'selection')

    // 选中替换~~~自动替换的没开发出来
    if (selection.isExpanded) {
        if (hasBGMark) {
            editor
                .removeMark(getBGMark)
                .addMark({
                    type: 'background-color',
                    data: { style: `background-color:${backgroundColor};` },
                })
        } else {
            editor
                .addMark({
                    type: 'background-color',
                    data: { style: `background-color:${backgroundColor};` },
                })
        }
    } else {
        console.info('库里吉娃阿里嘎多')
    }
}

export default setBackgroundColorMark
