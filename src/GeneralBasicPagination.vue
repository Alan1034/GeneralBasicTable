<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-19 10:56:53
 * @LastEditTime: 2024-12-30 11:32:07
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \GeneralBasicTable\src\GeneralBasicPagination.vue
 *
-->
<template>
  <div class="pagination-container">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :current-page.sync="currentPage"
      :page-size.sync="pageSize" :background="background" :layout="layout" :total="total" :size="size"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind="paginationAttrs" />
  </div>
</template>

<script>
// import { ElPagination } from 'element-plus'
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
    size: {
      type: String,
    },
    getList: {
      type: Function,
      default: () => { },
    },
    noUrlParameters: {
      // 不接受和不改变url的参数
      type: Boolean,
      default: false,
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
      currentPage: this.noUrlParameters ? Number(this.$route.query[this.currentPageKey]) || this.defCurrentPage : this.defCurrentPage,
      pageSize: this.noUrlParameters
        ? Number(this.$route.query[this.pageSizeKey]) || this.defPageSize
        : this.defPageSize,
    };
  },
  created() {
    if (!this.noUrlParameters) {
      this.$router.push({
        query: {
          [this.currentPageKey]: this.currentPage,
          [this.pageSizeKey]: this.pageSize,
          ...this.$route?.query,
        },
      });
    }
  },
  watch: {
    "$route.query": function (val, oldVal) {
      // 如果在别的组件切换参数，把参数监听回data中
      if (this.noUrlParameters) {
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
        this.currentPage = 1
        // this.handleSearch({ [this.currentPageKey]: this.currentPage, [this.pageSizeKey]: val })
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
