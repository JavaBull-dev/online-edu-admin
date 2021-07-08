<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          @change="subjectLevelOneChanged"
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/file/upload/cover'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
    </el-form>

    <el-form label-width="120px">
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import teacher from "@/api/edu/teacher";
import Tinymce from "@/components/Tinymce";
const defaultForm = {
  title: "",
  subjectId: "",
  teacherId: "",
  lessonNum: 0,
  description: "",
  cover: "",
  price: 0,
  cover: process.env.OSS_PATH + "/cover/default.jpg",
};
export default {
  components: { Tinymce },
  data() {
    return {
      courseInfo: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
      subjectNestedList: [], //一级分类列表
      subSubjectList: [], //二级分类列表
      teacherList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
    };
  },

  watch: {
    //监听
    $route(to, from) {
      //监听路由变化
      this.init();
    },
  },
  created() {
    this.init();
  },

  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res); // 上传响应
      // console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        const cid = this.$route.params.id;
        this.getCourseInfoById(cid);
      } else {
        this.getAllTeacher();
        this.getAllSubjectList();
        this.courseInfo = { ...defaultForm };
      }
    },
    getCourseInfoById(cid) {
      course
        .getCourseInfoById(cid)
        .then((response) => {
          this.courseInfo = response.data.courseInfo;
          // 初始化分类列表
          subject.getAllList().then((responseSubject) => {
            this.subjectNestedList = responseSubject.data.item;

            for (let i = 0; i < this.subjectNestedList.length; i++) {
              if (
                this.subjectNestedList[i].id === this.courseInfo.subjectParentId
              ) {
                this.subSubjectList = this.subjectNestedList[i].children;
              }
            }
          });
          this.getAllTeacher();
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },
    //获取所有课程分类
    getAllSubjectList() {
      subject.getAllList().then((response) => {
        if (response.success) {
          this.subjectNestedList = response.data.item;
        } else {
          this.$message({
            type: "info",
            message: "无法获取数据",
          });
        }
      });
    },
    // 获取所有讲师
    getAllTeacher() {
      teacher.getAllTeacher().then((response) => {
        if (response.success) {
          this.teacherList = response.data.item;
        }
      });
    },

    //一级分类发生改变
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    //保存或者提交课程信息
    saveOrUpdate() {
      if(this.$route.params && this.$route.params.id){
        course.updateCourse(this.courseInfo, this.courseInfo.id).then((response) => {
          if(response.success){
            this.$message({
              type: "success",
              message: "课程信息更新成功",
            });
            // 路由跳转
            this.$router.push({
              path: `/edu/course/chapter/${this.$route.params.id}`,
            });
          }else{
            this.$message({
              type: "error",
              message: response.message
            })
          }
        })
      }else{
        course.saveCourse(this.courseInfo).then((response) => {
          if (response.success) {
            this.$message({
              type: "success",
              message: "添加课程信息成功",
            });
            // 路由跳转
            this.$router.push({
              path: `/edu/course/chapter/${response.data.courseId}`,
            });
          } else {
            this.$message({
              type: "info",
              message: response.message,
            });
          }
        })
      }
    },
  },
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>