# GeneralBasicTable

一个兼容Vue2和Vue3的表格组件 <br/>
示例:

    <GeneralBasicTable
        size="mini"
        :getList="getList"
        :tableColumn="tableColumn"
        :tableList="tableList"
        :total="total"
        noUrlParameters // 不接受和不改变url的参数
        border
        :style="{ width: '98%', marginBottom: 10 + 'px' }"
        @selection-change="handleSelectionChange" // 传入选择框以后的回调函数，传出一个val参数
        @row-dblclick="addModel" // 行双击后的回调函数，传出row, column, event参数
    >
     frontSlot插槽放在前面，默认在后面
     <template v-slot:frontSlot>
        <el-table-column type="selection" width="55"> </el-table-column>
      </template>
        ...一些传入插槽的内容
    </GeneralBasicTable>

支持所有element-plus Table 表格的原生属性

![image](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202108231121814.png?token=AICSKHTT6CTUIOLWOWTTICTBEMNFK)

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
        key: 2,
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
        key: 3,
        prop: "XS",
        label: "XS",
        align:"center"
      },
    ],

安装：npm i general-basic-table<br/>
install: npm i general-basic-table
