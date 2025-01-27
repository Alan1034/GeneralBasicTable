<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-19 10:56:53
 * @LastEditTime: 2025-01-27 15:33:58
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \GeneralBasicTable\src\GeneralBasicPagination.vue
 *
-->
<template>
  <div class="pagination-container">
    <el-pagination :current-page.sync="currentPage" :page-size.sync="pageSize" :background="background" :layout="layout"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      v-bind="{ ...$attrs, ...paginationAttrs }" />
  </div>
</template>

<script>
import { HandleParamsData } from "network-spanner"
import { Schemas, HandleTable } from "general-basic-indexdb"
const { getData } = HandleTable
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
    DBPrimaryKey: {
      type: [String, Number],
      required: false,
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
      currentPage: this.initCurrentPage(),
      pageSize: this.initPageSize(),
    };
  },
  async created() {

    this.HandleParams({
      [this.currentPageKey]: this.currentPage,
      [this.pageSizeKey]: this.pageSize,
    })
  },
  async updated() {
    if (this.parametersType === "indexDB") {
      const DBParams = await getData({
        tableName: "formParams",
        propertiesKey: this.$route.path || "defQueryParams",
        primaryKey: this.DBPrimaryKey || "default",
        mapDB: formSchema
      })
      this.newData(DBParams)
    }
  },
  watch: {
    "$route.query": function (val, oldVal) {
      // 如果在别的组件切换参数，把参数监听回data中
      if (this.parametersType === "url") {
        this.newData(val)
      }
    },
    // currentPage: {
    //   handler(val) {
    //     console.log(val)
    //   },
    //   immediate: true
    // },
    // pageSize: {
    //   handler(val) {
    //     // if (this.currentPage === 1) {
    //     //   this.handleSearch({ [this.currentPageKey]: this.currentPage, [this.pageSizeKey]: val })
    //     // } else {
    //     //   // 触发watch currentPage
    //     //   this.currentPage = 1
    //     // }
    //     console.log(val)
    //   },
    //   immediate: true
    // },
  },

  methods: {
    handleSizeChange(val) {
      this.handleSearch({ [this.currentPageKey]: this.currentPage, [this.pageSizeKey]: val })
      if (this.autoScroll) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    handleCurrentChange(val) {
      this.handleSearch({ [this.currentPageKey]: val, [this.pageSizeKey]: this.pageSize })
      if (this.autoScroll) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    async HandleParams(params) {
      const searchParams = await HandleParamsData.makeParamsByType(params, this)
      // console.log(searchParams)
      await HandleParamsData.saveParamsByType(searchParams, this)
      return searchParams
    },
    async handleSearch(params = { [this.currentPageKey]: this.pageNum, [this.pageSizeKey]: this.pageSize }) {
      let searchParams = {
        ...params,
      };

      searchParams = await this.HandleParams(searchParams);
      this.getList({ ...searchParams });
    },
    newData(val) {
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
    initCurrentPage() {
      let defCurrentPage = this.defCurrentPage
      if (this.parametersType === "url") {
        defCurrentPage = Number(this.$route.query?.[this.currentPageKey]) || this.defCurrentPage
      }
      if (this.parametersType === "indexDB") {
        getData(
          {
            tableName: "formParams",
            propertiesKey: this.$route.path || "defQueryParams",
            primaryKey: this.DBPrimaryKey || "default",
            mapDB: formSchema
          }, (DBParams) => {
            this.currentPage = DBParams?.[this.currentPageKey]
          }
        )

      }
      return defCurrentPage
    },
    initPageSize() {
      let defPageSize = this.defPageSize
      if (this.parametersType === "url") {
        defPageSize = Number(this.$route.query?.[this.pageSizeKey]) || this.defPageSize
      }
      if (this.parametersType === "indexDB") {
        getData(
          {
            tableName: "formParams",
            propertiesKey: this.$route.path || "defQueryParams",
            primaryKey: this.DBPrimaryKey || "default",
            mapDB: formSchema
          }, (DBParams) => {
            this.pageSize = DBParams?.[this.pageSizeKey]
          }
        )
      }
      return defPageSize
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
