
# GeneralBasicTable

一个Vue3表格组件 <br/>
示例:

    <GeneralBasicTable
        size="mini"
        :getList="getList"
        :tableColumn="tableColumn"
        :tableList="tableList"
        border
        :style="{ width: '98%', marginBottom: 10 + 'px' }"
    >
     ...一些传入插槽的内容
    </GeneralBasicTable>

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
        key: 1,
        render: (scope) => {
          const { $index } = scope;
          let ele = "";
          switch ($index) {
            case 1:
              ele = "Lenght";
              break;
            case 2:
              ele = "Bust";
              break;
            case 3:
              ele = "Waist";
              break; 
            default:
              break;
          }
          return ele;
        },
      },
      {
        key: 2,
        prop: "XS",
        label: "XS",
        render: (scope) => {
          const { base } = scope.row;
          let ele = base;
          if (!base) {
            ele = < ElInput></ ElInput>;
          }
          return ele;
        },
      },
    ],

安装：npm i general-basic-table<br/>
install: npm i general-basic-table