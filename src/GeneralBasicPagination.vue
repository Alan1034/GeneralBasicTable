<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-19 10:56:53
 * @LastEditTime: 2025-01-26 17:21:03
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \GeneralBasicTable\src\GeneralBasicPagination.vue
 *
-->
<template>
  <div class="pagination-container">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :current-page.sync="currentPage"
      :page-size.sync="pageSize" :background="background" :layout="layout" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
      v-bind="{ ...$attrs, ...paginationAttrs }" />
  </div>
</template>

<script>
import { ObjectStoreInUrl } from "network-spanner"
import { utils } from "general-basic-form";
import { Schemas, HandleTable } from "general-basic-indexdb"
const {  getData } = HandleTable
const { formSchema } = Schemas
export default {
  name: "GeneralBasicPagination",
  // components: { ElPagination },
  props: {
    total: {
      required: true,
      type: Number,
      default: 0,
    },
    currentPageKey: {
      type: String,
      default: "page",
    },
    pageSizeKey: {
      type: String,
      default: "limit",
    },
    getList: {
      type: Function,
      default: () => { },
    },
    parametersType: {
      type: String,
      default: "url",
    },
    defCurrentPage: {
      type: Number,
      default: 1,
    },
    defPageSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    paginationAttrs: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      currentPage: this.noUrlParameters ? this.defCurrentPage : (Number(this.$route.query[this.currentPageKey]) || this.defCurrentPage),
      pageSize: this.noUrlParameters ? this.defPageSize : (Number(this.$route.query[this.pageSizeKey]) || this.defPageSize),
    };
  },
  async created() {
    this.HandleParams({
      [this.currentPageKey]: this.currentPage,
      [this.pageSizeKey]: this.pageSize,
    })
  },
  async updated() {
    console.log("updated")
    if (this.parametersType === "indexDB") {
      const DBParams = await getData({
        tableName: "formParams",
        propertiesKey: this.$route.path || "defQueryParams",
        primaryKey: "default",
        mapDB: formSchema
      })
      console.log("updated DBParams", DBParams)
    }
  },
  watch: {
    "$route.query": function (val, oldVal) {
      // 如果在别的组件切换参数，把参数监听回data中
      if (this.parametersType !== "url") {
        return;
      }
      if (
        val[this.currentPageKey] && this.currentPage !== Number(val[this.currentPageKey])
      ) {
        this.currentPage = Number(val[this.currentPageKey]);
      }
      if (
        val[this.pageSizeKey] && this.pageSize !== Number(val[this.pageSizeKey])
      ) {
        this.pageSize = Number(val[this.pageSizeKey]);
      }
    },
    currentPage: {
      handler(val) {
        this.handleSearch({ [this.currentPageKey]: val, [this.pageSizeKey]: this.pageSize })
        if (this.autoScroll) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      },
    },
    pageSize: {
      handler(val) {
        if (this.currentPage === 1) {
          this.handleSearch({ [this.currentPageKey]: this.currentPage, [this.pageSizeKey]: val })
        } else {
          // 触发watch currentPage
          this.currentPage = 1
        }
        if (this.autoScroll) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      },
    },
  },

  methods: {
    handleSizeChange(val) { },
    handleCurrentChange(val) { },
    async HandleParams(params) {
      const searchParams = await utils.makeParamsByType(params, this)
      await utils.saveParamsByType(searchParams, this)
      return searchParams
    },
    async handleSearch(params = { [this.currentPageKey]: this.pageNum, [this.pageSizeKey]: this.pageSize }) {
      let searchParams = {
        ...params,
      };

      searchParams = await this.HandleParams(searchParams);
      this.getList({ ...searchParams });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  text-align: right;
  background: #fff;
  padding: 32px 16px;
}
</style>
