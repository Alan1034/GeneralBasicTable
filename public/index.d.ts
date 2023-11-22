/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-07 17:55:59
 * @LastEditTime: 2023-11-22 17:13:19
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicTable\public\index.d.ts
 * 
 */
/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "general-basic-table";