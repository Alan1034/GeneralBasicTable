<!-- @format -->

# GeneralBasicTable

一个兼容 Vue2 和 Vue3 和react 的表格组件，支持 typescript，vue2 请使用@1 版本，Vue3 请使用@2 版本，react请使用@3版本 <br/>

示例:

    import { RBasicTable,RSUGeneralBasicTable } from "general-basic-table";
    <RBasicTable
                    coms={{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow }}
                    tableList={tableList}
                    tableColumn={tableColumn}
                  ></RBasicTable>


                  <RSUGeneralBasicTable
                    tableList={tableList}
                    tableColumn={tableColumn}
                  ></RSUGeneralBasicTable>

![image](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202108231121814.png)

数据示例:

    tableList: [
        {
          base: "inch",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ], //表格内容


      tableColumn: [
        {
          key: "date",
          prop: "date",
          label: "日期",
          align: "center",
        },
        {
          key: "name",
          prop: "name",
          label: "名字",
        },
        {
          key: "address",
          prop: "address",
          label: "地址",
          render: (scope) => {
            const { $index, row = {} } = scope;
            const { address } = row;
            // jsx语法依赖@vue/babel-plugin-jsx或@vitejs/plugin-vue-jsx，可能需要用到tsx文件（Vue3）
            // 详见https://github.com/vuejs/babel-plugin-jsx，https://cn.vitejs.dev/plugins/
            let ele = <div>{address}</div>;
            return ele;
          },
        },
      ],




安装：npm i general-basic-table<br/>
install: npm i general-basic-table
