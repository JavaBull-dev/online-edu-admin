import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
          })
    },
    
    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/'+id,
            method: 'delete'
          })
    },

    // 获取小节
    getVideoInfoById(id){
        return request({
            url: '/eduservice/video/'+id,
            method: 'get'
        })
    },

    updateVideo(video){
        return request({
            url: '/eduservice/video/',
            method: 'post',
            data: video
        })
    },

    // 删除云存储视频
    removeVideo(videoId){
        return request({
            url: `/eduvod/video/${videoId}`,
            method: 'delete',
        })
    },
}