<template>
  <div>
    <h2>这是表格组件，需要指定深度终点类名，element是el-table-row</h2>
    <p>
      需要注意的是，当表格列数过多，表格内部产生滚动条，直接导出的话滚动条外是被截掉的，也就是不管是表格还是其他组件，内部产生滚动条都是会被截掉
    </p>
    <p>
      解决方案1：尽量不要产生内部滚动条，如果避免不了，那么可以考虑导出时候将样式更改，把宽度加大到不出现滚动条，同时可以考虑将页面方向换成横向，不然可能在pdf中字看起来过小。
    </p>
    <p>
      解决方案2：如果不想导出时候更换样式，可以考虑渲染多一个，设置定位不可见，这个宽度就设置不出现滚动条为止，不过这样要多渲染，性能可能有点影响，内容多的话
    </p>
    <el-table ref="singleTable" :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="key1" label="key1"> </el-table-column>
      <el-table-column prop="key2" label="key2"> </el-table-column>
      <el-table-column prop="key3" label="key3"> </el-table-column>
      <el-table-column prop="key4" label="key4"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
      <!-- 测试列数过多导致滚动条情况,可自行测试 -->

      <!-- <el-table-column
          prop="key5"
          label="key5">
        </el-table-column>
        <el-table-column
          prop="key5"
          label="key5">
        </el-table-column>
        <el-table-column
          prop="key5"
          label="key5">
        </el-table-column>
        <el-table-column
          prop="key5"
          label="key5">
        </el-table-column>
        <el-table-column
          prop="key5"
          label="key5">
        </el-table-column>
        <el-table-column
          prop="key5"
          label="key5">
        </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "VuePdf2Table",

  data() {
    return {
      tableData: [
        {
          date: "2012",
          name: "姓名",
          address: "地址",
          age: "年龄",
          sex: "性别",
          key1: "key1-",
          key2: "key2-",
          key3: "key3-",
          key4: "key4-",
          key5: "key5-"
        }
      ]
    }
  },

  mounted() {
    this.getTableData()
  },

  methods: {
    getTableData() {
      for (let i = 0; i < 20; i++) {
        this.tableData.push({
          date: "2012" + i,
          name: "姓名" + i,
          address: "地址" + i,
          age: "年龄" + i,
          sex: "性别" + i,
          key1: "key1-" + i,
          key2: "key2-" + i,
          key3: "key3-" + i,
          key4: "key4-" + i,
          key5: "key5-" + i
        })
      }

      this.$nextTick(() => {
        this.$refs.singleTable.doLayout() // 解决表格错位
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
