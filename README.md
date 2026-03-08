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
          className: 'p-0',
 render: (scope, column, index) => {
        let ele = <div>{scope[column.prop]}</div>;
        return ele;
      },
        },
      ],

 多行TableRow示例

  const tableColumn = [
    {
      key: 'code',
      prop: 'code',
      label: '套餐等级',
      // align: 'center',
    },
    {
      key: 'name',
      prop: 'name',
      label: '套餐名称',
    },
    {
      key: 'handle',
      prop: 'handle',
      label: '处理',
      render: (scope, column, index) => {
        let ele = <div>{scope[column.prop]}</div>;
        return ele;
      },
      sortable: (scope, column, index) => {
        console.log(scope, column, index);
      },
    },
  ];
  const expandColumn = [
    {
      key: 'expand',
      prop: 'expand',
      label: '展开',
      colSpan: tableColumn.length,
      render: (scope, column, index) => {
        let ele = <PackageDetail></PackageDetail>;
        return ele;
      },
    },
  ];
  const tableTableRows = [tableColumn, expandColumn];

      <RBasicTable
        coms={{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow }}
        tableList={tableList}
        tableColumn={tableColumn}
        tableTableRows={tableTableRows}
      ></RBasicTable>


import { RBasicTable, RSUGeneralBasicTable, RSUGeneralBasicPagination, RBasicPagination } from 'general-basic-table';
import { ObjectStoreInUrl } from 'network-spanner';

  const getList = async (
  params = {
      page: ObjectStoreInUrl.getURLParameter({ decode: true }).page || 1,
      pageSize: ObjectStoreInUrl.getURLParameter({ decode: true }).pageSize ||5,
    }
  ) => {
    const response = await getList_({ ...params });
    if (response.status === 'ok') {
      setTotal(response.totalCount);
      setTableList(response.data);
    }
  };

      <RBasicPagination  hideOnSinglePage getList={getIntendedPackageList} total={total} defPageSize={5} />

      <RBasicPagination
        coms={{
          Pagination,
          PaginationContent,
          PaginationEllipsis,
          PaginationItem,
          PaginationLink,
          PaginationNext,
          PaginationPrevious,
        }}
        hideOnSinglePage
        getList={getIntendedPackageList}
        total={total}
        defPageSize={5}
      />

parametersType类型介绍

| parametersType形式 | 支持页面刷新 | 参数改变引起路由跳转 | 组件间共享数据 | 存储上限 | 支持区分不同用户和路由 | 浏览器兼容性 |
| ------------------ | ------------ | -------------------- | -------------- | -------- | ---------------------- | ------------ |
| url                | 是           | 是                   | 是             | 中       | 否                     | 高           |
| data               | 否           | 否                   | 否             | 高       | 否                     | 高           |
| indexDB            | 是           | 否                   | 是             | 高       | 是                     | 中           |

数据示例:

```
total:0, //总条数
currentPageKey:"page", //当前页数key
pageSizeKey:"limit", //每页显示个数选择器的选项设置
small：false, //是否使用小型分页样式
getList:()=>{}, //切换分页调用的函数
parametersType:"url" // 见parametersType类型介绍
DBPrimaryKey：//[String, Number] indexDB的primaryKey，一般配合parametersType==="indexDB"使用
defCurrentPage:1, //默认的页数
defPageSize：10, //默认的每页显示个数
hideOnSinglePage:false, //当只有一页时是否隐藏分页器
paginationAttrs //Pagination组件的屬性
tableTableRows:[tableColumn,[...第二行的tableColumn]] //每条数据生成多行
rowSelection:{
  type: 'checkbox', // checkbox 
}
selectedRows: [], // 选中的行索引数组
selectionChange:({ scope, index, selectedIndexs })=>{} // 选中行变化的回调函数
page:1, //父组件控制当前页数

安装：npm i general-basic-table<br/>
install: npm i general-basic-table
