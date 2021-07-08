import request from '@/utils/request'

export default {

    //添加或者保存课程信息
    saveCourse(defaultForm) {
        return request({
            url: `/eduservice/course/saveCourseInfo`,
            method: "post",
            data: defaultForm
        })
    },
    //更新课程
    updateCourse(defaultForm, id) {
        return request({
            url: `/eduservice/course/updateCourseInfo/${id}`,
            method: "post",
            data: defaultForm
        })
    },
    // 获取课程分类信息
    getSubjectList() {
        return request({
            url: `/eduservice/course/saveCourseInfo`,
            method: "post",
            data: defaultForm
        })
    },
    //获取课程信息
    getCourseInfoById(cid) {
        return request({
            url: `/eduservice/course/getCourseInfo/${cid}`,
            method: "get"
        })
    },

    // 获取课程的发布信息
    getCoursePublishInfoById(id) {
        return request({
            url: `/eduservice/course/coursePublishInfo/${id}`,
            method: 'get'
        })
    },

    // 发布课程
    publishCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'put'
        })
    },
    // 分页查询课程
    getPageList(page, limit, searchObj) {
        return request({
            url: `/eduservice/course/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    // 删除课程
    removeById(id){
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
        })
    },
}