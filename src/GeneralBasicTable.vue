<!-- /** 通用表格组件 使用方法：
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
; }, }, ] */ -->
<template>
  <div>
    <el-table :data="tableList" :size="size" ref="queryTableRef" v-on="version === 2 ? $listeners : {}" v-bind="$attrs">
      <slot name="frontSlot" />
      <el-table-column v-for="column in tableColumn" :key="column.key" v-bind="column">
        <template v-if="version === 3" #default="scope">
          <!-- 第一种方法，定义一个标签和一个组件 -->
          <component v-if="column.render" :is="currentTabComponent(column, scope)" :column="column" :scope="scope" />
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
    <GeneralBasicPagination v-show="total > 0" :pageNumKey="pageNumKey" :pageSizeKey="pageSizeKey" :total="total"
      :paginationAttrs="paginationAttrs" :getList="getList" :parametersType="parametersType" />
  </div>
</template>

<script>

import * as Vue from "vue";
import TableColumn from "./components/TableColumn.js";
import GeneralBasicPagination from "./GeneralBasicPagination.vue";
export default {
  name: "GeneralBasicTable",
  components: {
    GeneralBasicPagination,
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
    },
    pageNumKey: {
      type: String,
      default: () => "page",
    },
    pageSizeKey: {
      type: String,
      default: () => "limit",
    },
    getList: {
      type: Function,
      default: () => { },
    },
    parametersType: {
      type: String,
      default: "url",
    },
    paginationAttrs: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
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
