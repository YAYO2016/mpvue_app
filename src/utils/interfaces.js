/**
 * Created by yanyue on 2019-11-28 21:22
 */
const domain = 'https://mpvue0124.herokuapp.com/';

const interfaces = {
  //获取openid的接口地址
  getOpenId:domain + 'api/profiles/getOpenid',
  //获取是否经过了课程测试
  getMyLesson:domain + 'api/profiles/mylessons',
  //获取测试问题数据
  getQuestions:domain + 'api/profiles/questions',
  //获取推荐给用户的课程数据
  myLesson: domain + 'api/profiles/mylesson',
  //获取最热课程数据
  getHotLessons: domain + 'api/profiles/hotLessons',
  //获取视频目录的接口
  getCatalogue: domain + 'api/profiles/lessondetail',
  //获取全部课程的接口
  getLessons: domain + 'api/profiles/lessons',
};

module.exports = interfaces;
