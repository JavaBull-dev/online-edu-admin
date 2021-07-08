import request from '@/utils/request'
const api_name = "/eduservice/chapter"
export default {

    //根据课程id获取课程章节
    getNestedTreeList(cid) {
        return request({
            url: `${api_name}/getChapter/${cid}`,
            method: "get"
        })
    },

    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },

    save(chapter) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: chapter
        })
    },

    getById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },

    updateById(chapter) {
        return request({
            url: `${api_name}/${chapter.id}`,
            method: 'post',
            data: chapter
        })
    }
}