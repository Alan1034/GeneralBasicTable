# GeneralBasicTable

一个兼容Vue2和Vue3的表格组件，支持typescript，vue2请使用@1版本，Vue3请使用@2版本 <br/>
示例:

    import { VGeneralBasicTable } from "general-basic-table";
    <VGeneralBasicTable
        size="mini"
        :getList="getList"
        :tableColumn="tableColumn"
        :tableList="tableList"
        :total="total"
        noUrlParameters // 不接受和不改变url的参数
        border
        :style="{ width: '98%', marginBottom: 10 + 'px' }"
        ref="VGeneralBasicTable"
        @selection-change="handleSelectionChange" // 传入选择框以后的回调函数，传出一个val参数
        @row-dblclick="addModel" // 行双击后的回调函数，传出row, column, event参数
        :paginationAttrs="{
            size: device === 'mobile' ? 'small' : null,
            layout:
              device === 'mobile' ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
        }"
    >
     frontSlot插槽放在前面，默认在后面
     <template v-slot:frontSlot>
        <el-table-column type="selection" width="55"> </el-table-column>
      </template>
        ...一些传入插槽的内容
    </VGeneralBasicTable>

支持所有element-plus element-ui Table 表格的原生属性

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
            // jsx语法依赖@vue/babel-plugin-jsx或@vitejs/plugin-vue-jsx，可能需要用到tsx文件（Vue3）（Vue2直接在data写TS即可）
            // 详见https://github.com/vuejs/babel-plugin-jsx，https://cn.vitejs.dev/plugins/
            let ele = <div>{address}</div>;
            return ele;
          },
        },
      ],
    multipleSelection: [], //表格选中项
    total:0,
    paginationAttrs //el-pagination的屬性

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

table提供ref调用：

    this.$refs["generalBasicTable"].$refs["queryTableRef"]    

安装：npm i general-basic-table<br/>
install: npm i general-basic-table
