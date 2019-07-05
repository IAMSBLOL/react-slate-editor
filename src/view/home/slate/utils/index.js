/**
   * 是否mark `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

export const hasMark = function (type) {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
}

/**
 * 是否 block `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

export const hasBlock = function (type) {
    console.log(this)
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
}
