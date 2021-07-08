import request from '@/utils/request'

export default {

    //获取所有讲师xinxi
    getAllTeacher(){
        return request({
            url: `/eduservice/teacher/getAll`,
            method: "get"
        })
    },
    // 获取讲师列表
    getPageList(current, pagesize, teacherQuery){
        return request({
            url: `/eduservice/teacher/pageThacher/${current}/${pagesize}`,
            method: "post",
            data: teacherQuery
        })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/add`,
            method: "post",
            data: teacher
        })
    },
    // 编辑讲师
    getTeacher(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: "get"
        })
    },
    updateTeacher(teacher){
        return request({
            url: `/eduservice/teacher/`,
            method: "post",
            data: teacher
        })
    },
    // 删除讲师
    deleteTeacher(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: "delete"
        })
    }
}