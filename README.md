<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-19 10:56:51
 * @LastEditTime: 2021-11-22 18:07:04
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicTable\README.md
 * 
-->
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
            let ele = <div>{address}</div>;
            return ele;
          },
        },
      ],
    multipleSelection: [], //表格选中项
    total:0,
    
methods示例：

    async getList(
      params = {
        page: Number(this.$route.query.page) || 1,
        limit: Number(this.$route.query.limit) || 10,
      }
    ) {}

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

安装：npm i general-basic-table<br/>
install: npm i general-basic-table
