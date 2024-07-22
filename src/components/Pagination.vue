<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-07-19 10:56:53
 * @LastEditTime: 2024-07-15 18:49:46
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \GeneralBasicTable\src\components\Pagination.vue
 *
-->
<template>
  <div class="pagination-container">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :current-page.sync="currentPage"
      :page-size.sync="pageSize" :background="background" :layout="layout" :total="total" :size="size"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind="$attrs" />
  </div>
</template>

<script>
// import { ElPagination } from 'element-plus'
export default {
  name: "Pagination",
  // components: { ElPagination },
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
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
    size: {
      type: String,
    },
  },
  data() {
    return {
      haveMounted: false, // 模板内容未生成的时候，分页参数会set一次导致触发查询，用这个来判断阻止这次查询
    };
  },
  mounted() {
    this.haveMounted = true;
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        if (this.haveMounted) {
          this.$emit("update:page", val);
          this.$emit("pagination", { page: val, limit: this.pageSize });
        }
        if (this.autoScroll) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        if (this.haveMounted) {
          this.$emit("update:limit", val);
          this.$emit("pagination", { page: this.currentPage, limit: val });
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
