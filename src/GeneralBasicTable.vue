/** 通用表格组件 使用方法：
<GeneralBasicTable
  :getList="getList"
  :tableList="tableList"
  :total="total"
  :tableColumn="tableColumn"
  :size="size"
>
     ...一些传入插槽的内容
</GeneralBasicTable>

数据格式样例： tableColumn: [ { key: 1, type: "selection", width: "55" }, { key:
2, prop: "name", label: "款式序号" }, { key: 3, prop: "name", label: "款式图片"
}, { key: 4, prop: "name", label: "款式名称" },{ key: 99, label: "操作", render:
(scope) => { const { name = "按钮" } = scope.row; return
<ElButton>{name}</ElButton>
; }, }, ] */
<template>
  <div>
    <el-table
      :data="tableList"
      :size="size"
      v-on="version === 2 ? $listeners : {}"
      v-bind="$attrs"
    >
      <slot name="frontSlot" />
      <el-table-column
        v-for="column in tableColumn"
        :key="column.key"
        v-bind="column"
      >
        <template v-if="version === 3" #default="scope">
          <!-- 第一种方法，定义一个标签和一个组件 -->
          <component
            v-if="column.render"
            :is="currentTabComponent(column, scope)"
            :column="column"
            :scope="scope"
          />
          <!-- 第二种方法，传入一个组件 -->
          <!-- <TableColumn :column="column" :scope="scope" /> -->
          <div v-else>{{ scope.row[column.prop] }}</div>
        </template>
        <template v-if="version === 2" slot-scope="scope">
          <!-- 兼容vue2的写法 -->
          <TableColumn v-if="column.render" :column="column" :scope="scope" />
          <div v-else>{{ scope.row[column.prop] }}</div>
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <!-- 兼容vue2的写法 -->
    <Pagination
      v-show="total > 0"
      v-model:page="pageNum"
      v-model:limit="pageSize"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      :total="total"
      @pagination="handleSearch"
    />
  </div>
</template>

<script>
// import "element-plus/packages/theme-chalk/src/base.scss";
// import { ElTable, ElTableColumn } from "element-plus";
import Pagination from "./components/Pagination.vue";
import * as Vue from "vue";
import TableColumn from "./components/TableColumn.js";

export default {
  name: "GeneralBasicTable",
  components: {
    // ElTable,
    // ElTableColumn,
    Pagination,
    TableColumn,
    TabArchive: (props) => {
      const { column, scope } = props;
      return column.render(scope);
    },
  },
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
    tableColumn: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: () => "medium",
    },
    otherProps: {
      type: Object,
      default: () => {},
    },
    getList: {
      type: Function,
      default: () => {},
    },
    noUrlParameters: {
      // 不接受和不改变url的参数
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      pageNum: this.noUrlParameters ? Number(this.$route.query.page) || 1 : 1,
      pageSize: this.noUrlParameters
        ? Number(this.$route.query.limit) || 10
        : 10,
    };
  },
  updated() {
    // 如果在别的组件切换参数，把参数监听回data中
    if (this.noUrlParameters) {
      return;
    }
    if (
      this.$route.query.page &&
      this.pageNum !== Number(this.$route.query.page)
    ) {
      this.pageNum = Number(this.$route.query.page);
    }
    if (
      this.$route.query.limit &&
      this.pageSize !== Number(this.$route.query.limit)
    ) {
      this.pageSize = Number(this.$route.query.limit);
    }
  },
  created() {
    this.$router.push({
      query: {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.$route?.query,
      },
    });
  },
  methods: {
    /** 查询列表 */
    handleSearch(params = { page: this.pageNum, limit: this.pageSize }) {
      // const params = { page: this.pageNum, limit: this.pageSize };
      let searchParams = {
        ...params,
      };
      if (!this.noUrlParameters) {
        searchParams = {
          ...this.$route?.query,
          ...params,
        };
        this.$router.push({ query: { ...searchParams } });
      }

      this.getList({ ...searchParams });
    },
    currentTabComponent(column, scope) {
      return "tab-archive";
    },
  },
  computed: {
    version() {
      return Vue.default
        ? Number(Vue.default.version.split(".")[0])
        : Number(Vue.version.split(".")[0]);
    },
  },
};
</script>

<style></style>
