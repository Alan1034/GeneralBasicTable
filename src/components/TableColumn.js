/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-10-08 15:00:02
 * @LastEditTime: 2021-10-08 15:36:31
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: Vue2的表格子元素
 * @FilePath: \GeneralBasicTable\src\components\tableColumn.js
 * 
 */


const TableColumn = {
  functional: true,
  props: {
    column: {
      default: { render: () => { } },
      type: Object,
    },
    scope: {
      default: {},
      type: Object,
    },
  },
  render(createElement, context) {
    const { props } = context;
    const { column, scope } = props;
    const ele = column.render(scope)
    return ele;
  }
}

export default TableColumn;

