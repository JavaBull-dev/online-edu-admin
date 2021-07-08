<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="课程分类名称" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {

  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps:{
        children: 'children',
        label: 'title'
      }
    }
  },
  created(){
    this.getAllList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    getAllList(){
        subject.getAllList().then(response=>{
            if(response.success){
                this.data2 = response.data.item
            }else{
                this.$message({
                    type: 'info',
                    message: '无法获取数据'
                })
            }
        })
    }
  }
}
</script>