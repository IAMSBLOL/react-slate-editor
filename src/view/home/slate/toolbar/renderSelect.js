import React from 'react'
import { SlateSelect } from '../simpleConponent/components'
/**
   *
   * @param {String} type
   * @param {String} icon
   * @param {Any} remarks （）
   * @return {Element}
   */
export default function (type, remarks, bindClick, data, index = 0) {
    return (
        <SlateSelect remarks={remarks} onChange={bindClick} data={data} defaultValue={data[index]['key']} />
    )
}
