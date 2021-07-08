import request from '@/utils/request'

export default {

    // 获取分类列表
    getAllList(){
        return request({
            url: `/eduservice/subject/list`,
            method: "get"
        })
    }
}