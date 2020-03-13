import { get, post } from './http';
import { showMsg, urlParams, delNullProperty } from '@/common/utils';
import { wx_getLocation } from '@/common/wx';
import store from 'store';
const reg = /^2/;

export function parseRes(
  res,
  errMsg = '请求失败',
  resolveStatus = [],
  tipStatus = []
) {
  // const c = true;
  // if(typeof beforeCb === 'function'){
  //   c = beforeCb(res);
  // }
  //
  // if(!c){
  //   return;
  // }
  if (
    (!!res && reg.test(res.status)) ||
    resolveStatus.includes(res.status) ||
    tipStatus.includes(res.status)
  ) {
    if (tipStatus.includes(res.status)) {
      return showMsg(res.message);
    }
    return res.rows ? res.rows : res;
  } else {
    const msg = res && res.message ? res.message : errMsg;
    showMsg(msg);
    throw new Error(msg ? msg : 'error');
  }
}

/**
 * / api/login/checkPhone
 验证手机号是否注册
 * @param userPhone
 * @returns {Promise<T | never>}
 */
export function checkPhone(userPhone) {
  let url = '/api/login/checkPhone';
  const loadingText = '';
  const errMsg = '';

  url = urlParams(url, { userPhone });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * /api/vcode/checkVCode
 验证验证码
 * @param phone
 * @param vcode
 * @returns {Promise<any | never>}
 */
export function checkVCode(phone, vcode) {
  let url = '/api/vcode/checkVCode';
  const loadingText = '';
  const errMsg = '';

  url = urlParams(url, { phone, vcode });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * GET /api/vcode/get
 发送验证码 30分钟有效


 * @param phone
 * @returns {Promise<any | never>}
 */
export function getPhoneCode(phone) {
  let url = '/api/vcode/get';
  const loadingText = '发送验证码...';
  const errMsg = '';

  url = urlParams(url, { phone });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * / api/login/loginByPhone
 手机号登陆 --编号 003


 * @param userPhone
 * @param userPwd
 * @param deviceId
 * @returns 请求已完成 rows 直接返回token
 */
export function loginByPhone(userPhone, userPwd, deviceId) {
  let url = '/api/login/loginByPhone';
  const loadingText = '正在登入...';
  const errMsg = '登入失败';

  // url = urlParams(url, { userPhone, userPwd, deviceId });
  url = urlParams(url, { userPhone, userPwd });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * GET /api/login/loginByVcode
 验证码登陆
 * @param userPhone
 * @param vcode
 * @param deviceId
 * @returns {Promise<any | never>}
 */
export function loginByVcode(userPhone, vcode, deviceId) {
  let url = '/api/login/loginByVcode';
  const loadingText = '正在登入...';
  const errMsg = '登入失败';

  url = urlParams(url, { userPhone, vcode, deviceId });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * /api/login/wxlogin
 小程序用户登录 1 rows 直接返回TOKEN


 * @param code
 * @param userHead
 * @param userName
 * @param userSex
 * @returns {Promise<T | never>}
 */
export function loginByWx(code, userHead, userName, userSex) {
  let url = '/api/login/wxlogin';
  const loadingText = '正在登入...';
  const errMsg = '登入失败';
  const data = {
    code,
    userHead,
    userName,
    userSex
  };
  return post(url, data, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * /api/login/registerByPhone
 手机号注册
 * @param userPhone
 * @param userPwd
 * @returns 请求已完成 ROW 直接返回 TOKEN
 */
export function registerByPhone(userPhone, vcode, userPwd) {
  let url = '/api/login/registerByPhone';
  const loadingText = '正在注册...';
  const errMsg = '注册失败';

  url = urlParams(url, { userPhone, vcode, userPwd });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

// //是否注册过
// export function isSignUp() {
//   const url = '/api/singUp/isSingUp';
//   const data = {};
//   return post(url, data).then(res => {
//     console.log('isSignUp', res);
//     if (res && res.status == '9006') {
//       return true;
//     } else if (res && res.status == '9007') {
//       return false;
//     } else {
//       throw new Error(res.message ? res.message : '请求失败');
//     }
//   });
// }

/**
 * / api/login/registerByWx
 微信注册 --编号 004
 * @param openid
 * @param userHead
 * @param userName
 * @param userPhone
 * @returns 请求已完成 ROW 直接返回 TOKEN
 */
export function registerByWx(openid, userHead, userName, userPhone) {
  const url = '/api/login/registerByWx';
  const loadingText = '正在注册...';
  const errMsg = '注册失败';
  const data = {
    openid,
    userHead,
    userName,
    userPhone
  };
  return post(url, data, loadingText).then(res => parseRes(res, errMsg));
}

/**
 *  GET /api/login/getMsgById
 通过id获取用户信息 --编号 007

 Response Class (Status 200)
 Successful — 请求已完成 rows 直接返回token

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 id

 query  string
 */
export function getMsgById(userId) {
  let url = '/api/login/getMsgById';

  const p = {
    id: store.state.user.id,
    collectUserId: userId
  };
  url = urlParams(url, delNullProperty(p));
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *  GET /api/getupSleep/clock
 用户打卡

 Parameter  Value  Description  Parameter Type  Data Type
 userId
 (required)
 用户Id

 query  string
 clockType
 (required)
 打开类型，0 起床 1 睡觉

 query  string

 res : {id: 3, openid: "o46rv0E8sy9FKYCkm-Y9z-xUkLic",…}
 createTime: null
 deviceId: null
 id: 3
 isVip: 0
 openid: "o46rv0E8sy9FKYCkm-Y9z-xUkLic"
 token: null
 userCity: null
 userHead: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erRwRs5Wy2UL497AuEFIQ17qujbaXDrO3icvyB1MD4AicRx3UqKY7OjhYicbV78Rp1vlzfibp0HrKWtVA/132"
 userIntegral: 0
 userName: "ThinKing"
 userPhone: null
 userPwd: null
 vipTime: null
 */
export function getupSleepClock(userId, clockType) {
  let url = '/api/getupSleep/clock';

  const loadingText = '打卡...';
  const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    clockType
  });
  return get(url, {}, loadingText).then(res =>
    parseRes(res, errMsg, [], ['2001'])
  );
}

//todo 学习时间没有返回 学习的id ，
//todo 没有刷新获取学习时间的接口
/**
 * GET /api/learnTime/add
 添加学习计时 --编号 001

 userId
 (required)
 用户Id

 query  string
 learnContent
 (required)
 学习内容

 query  string
 learnTime
 (required)
 学习时间

 query  string
 */
export function learnTimeAdd(userId, learnContent, learnTime) {
  let url = '/api/learnTime/add';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    learnContent,
    learnTime
  });
  return get(url, {}, '').then(res => parseRes(res, '', [], ['2001']));
}

/**
 GET /api/learnTime/suspend
修改状态 --编号 002

Response Class (Status 200)
手机号未注册

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
id	
(required)
学习计时id

query	string
remaindLearnTime	
(required)
已用时间

query	string
learnState	
(required)
状态（1 学习 2暂停 3 学完）

query	string
 */
export function learnTimeSuspend(id, remaindLearnTime, learnState) {
  let url = '/api/learnTime/suspend';

  url = urlParams(url, {
    id,
    remaindLearnTime,
    learnState
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 * GET /api/learnTime/finish
 结束 --编号 003

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 (required)
 学习计时id

 query  string
 finishTime
 (required)
 结束时间
 */
export function learnTimeFinish(id, finishTime) {
  let url = ' /api/learnTime/finish';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id,
    finishTime
  });
  return get(url, {}, '').then(res => parseRes(res, '', [], [2001]));
}

/**
 * GET /api/learnTime/suspend
 暂停 --编号 002

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 (required)
 学习计时id

 query  string
 remaindLearnTime
 (required)
 已用时间

 query  string
 Response Messages
 HTTP Status Code  Reason  Response Model  Headers
 400
 请求中有语法问题，或不能满足请求

 401
 未授权客户机访问数据

 403
 Forbidden

 404
 服务器找不到给定的资源；文档不存在

 500
 服务器不能完成请求

 2001
 用户已打卡
 */
// export function learnTimeSuspend(id, remaindLearnTime) {
//   let url = ' /api/learnTime/suspend';

//   // const loadingText = '打卡...';
//   // const errMsg = '打卡失败';

//   url = urlParams(url, {
//     id,
//     remaindLearnTime
//   });
//   return get(url, {}, '').then(res => parseRes(res, '', [], [2001]));
// }

//todo 继续学习的接口没有

//todo 学习计划：没有获取学习计划的列表接口

/**
 *GET /api/learnPlan/add
 添加学习计划 --编号 001

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 JsonResult {
message (string, optional): 响应提示 ,
path (string, optional): 路径 ,
rows (object, optional): 响应数据 ,
status (string, optional): 响应状态
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 userId
 (required)
 用户Id

 query  string
 planContent
 (required)
 学习计划内容

 query  string
 planTime
 (required)
 学习计划时间

 query  string
 */
export function learnPlanAdd(userId, planContent, planTime) {
  let url = '/api/learnPlan/add';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    planContent,
    planTime
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * /api/learnTime/getLearnTime
 根据id获取学习计划 --编号 004

 Response Class (Status 200)
 请求已完成

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 token
 (required)
 token

 header  string
 id
 学习计划id

 query  string
 Response Messages
 HTTP Status Code  Reason  Response Model  Headers
 400
 请求中有语法问题，或不能满足请求

 401
 未授权客户机访问数据

 403
 Forbidden

 404
 服务器找不到给定的资源；文档不存在

 500
 服务器不能完成请求
 */
export function getLearnTime(id) {
  let url = '/api/learnTime/getLearnTime';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 GET /api/learnTime/finish
结束 --编号 003

Response Class (Status 200)
手机号未注册

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
id	
(required)
学习计时id

query	string
finishTime	
(required)
结束时间

query	string
 */
export function learnTimefinish(id) {
  let url = '/api/learnTime/finish';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 /api/learnTime/suspend
暂停 --编号 002

Response Class (Status 200)
手机号未注册

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
id	
(required)
学习计时id

query	string
remaindLearnTime	
(required)
已用时间

 */
export function learnTimesuspend(id, remaindLearnTime) {
  let url = '/api/learnTime/suspend';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id,
    remaindLearnTime
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/learnPlan/del
 删除学习计划 --编号 003

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 (required)
 计划id
 */
export function learnPlanDel(id) {
  let url = '/api/learnPlan/del';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/learnPlan/update
 改变学习计划状态 --编号 002

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 (required)
 计划id
 */
export function learnPlanUpdate(id) {
  let url = '/api/learnPlan/update';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/learnDiary/add
 添加学习日记 --编号 001

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 userId
 (required)
 用户Id

 query  string
 diaryContent
 (required)
 学习日记内容

 query  string
 diaryImg
 (required)
 学习日记图片
 */
export function learnDiaryAdd(userId, diaryContent, diaryImg) {
  let url = '/api/learnDiary/add';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    diaryContent,
    diaryImg
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/forum/getCategory
 获取二级分类 --编号 008

 Response Class (Status 200)
 请求已完成

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {
    "addTime": "string",
    "categoryName": "string",
    "createBy": "string",
    "createTime": "2019-12-07T08:18:03.712Z",
    "id": 0,
    "params": {},
    "remark": "string",
    "searchValue": "string",
    "sort": 0,
    "updateBy": "string",
    "updateTime": "2019-12-07T08:18:03.712Z"
  },
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 token
 (required)
 token
 */
export function forumgetCategory() {
  let url = '/api/forum/getCategory';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/forum/addScan
 增加阅读量 --编号 007

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 id
 (required)
 帖子


 */
export function forumaddScan(id) {
  let url = '/api/forum/addScan';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 GET /api/forum/forumEvaluate
评论帖子 --编号 006

Response Class (Status 200)
手机号未注册

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
userId	
(required)
用户Id

query	string
postId	
(required)
帖子id

query	string
evaluateContent	
(required)
评论内容

query	string

 */
export function forumEvaluate(postId, evaluateContent) {
  let url = '/api/forum/forumEvaluate';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId: store.state.user.id,
    postId,
    evaluateContent
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 GET /api/forum/getForumById
根据帖子id获取帖子信息 --编号 010

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "id": 0,
    "name": "string",
    "sort": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
(required)
登录用户id

query	string
id	
(required)
帖子id

query	string


 */
export function getForumById(userId, id) {
  let url = '/api/forum/getForumById';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/forum/forumCollect
 关注一级分类 --编号 002

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 userId
 (required)
 用户Id

 query  string
 labelId
 (required)
 一级分类id


 */
export function forumforumCollect(labelId) {
  let url = '/api/forum/forumCollect';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId: store.state.user.id,
    labelId
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *
 * GET /api/forum/userCollect
 关注用户 --编号 005

 Response Class (Status 200)
 手机号未注册

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 userId
 (required)
 用户Id

 query  string
 collectUserId
 (required)
 被关注用户id

 */
export function forumuserCollect(collectUserId) {
  let url = '/api/forum/userCollect';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId: store.state.user.id,
    collectUserId
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
 *
 *
 * /api/common/getCity
 获取城市接口 --编号 001

 Response Class (Status 200)
 请求已完成

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {
    "cityName": "string",
    "citySort": 0,
    "createTime": "string",
    "id": 0,
    "isDel": 0
  },
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter	Value	Description	Parameter Type	Data Type
 token
 (required)
 token

 header	string

 */
export function getCity() {
  let url = '/api/common/getCity';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 *GET /api/forum/getLabel
 获取一级分类 --编号 009

 Response Class (Status 200)
 请求已完成

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {
    "id": 0,
    "name": "string",
    "sort": 0
  },
  "status": "string"
}

 */
export function getLabel() {
  let url = '/api/forum/getLabel';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 GET /api/map/getUserNum
首页地图数量 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string

 */
export function getUserNum() {
  let url = '/api/map/getUserNum';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '')
    .then(res => parseRes(res, ''))
    .then(t => {
      store.commit('setTotalOnlineNum', t);
      return t;
    });
}

/**
 GET /api/map/selectUserNumList
分省的数量 --编号 002

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "adCode": "string",
    "cityCaption": "string",
    "cityOrder": 0,
    "cityState": 0,
    "createBy": "string",
    "createTime": "2020-03-03T02:51:43.052Z",
    "params": {},
    "parentCode": "string",
    "parentLevel": 0,
    "remark": "string",
    "searchValue": "string",
    "updateBy": "string",
    "updateTime": "2020-03-03T02:51:43.052Z"
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string

 */
export function selectUserNumList() {
  let url = '/api/map/selectUserNumList';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}

//todo 获取城市列表

/**
 *
 * POST /api/forum/post
 发帖 --编号 004

 Response Class (Status 200)
 Successful — 请求已完成 ROW 直接返回 TOKEN

 ModelExample Value
 {
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


 Response Content Type
 Parameters
 Parameter  Value  Description  Parameter Type  Data Type
 kmwtForumPostAdd
 (required)

 Parameter content type:
 kmwtForumPostAdd

 body
 ModelExample Value
 新增发帖 {
categoryId (integer, optional): 帖子分类id ,
content (string, optional): 内容 ,
postLabel (integer, optional): 一级分类 ,
title (string, optional): 标题 ,
userId (integer, optional): 发帖用户id
}
 Response Messages
 */
export function forumpost(categoryId, content, postLabel, title, userId) {
  let url = '/api/forum/post';
  const loadingText = '正在发帖...';
  const errMsg = '发帖失败';
  const data = {
    categoryId,
    content,
    postLabel,
    title,
    userId
  };
  return post(url, data, loadingText).then(res => parseRes(res, errMsg));
}

/**
 GET /api/vip/getVipMsg
获取开通会员的信息 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "createBy": "string",
    "createTime": "2020-03-03T02:51:43.000Z",
    "id": 0,
    "params": {},
    "remark": "string",
    "searchValue": "string",
    "updateBy": "string",
    "updateTime": "2020-03-03T02:51:43.000Z",
    "vipNum": 0,
    "vipOrginalPrice": 0,
    "vipPrice": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string

 */
export function getVipMsg() {
  let url = '/api/vip/getVipMsg';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 GET /api/near/getNear
获取附近的人 --编号 002

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
id	
id

query	string
token	
(required)
token

header	string
longitude	
经度

query	string
latitude	
纬度

query	string

 */
export function getNear() {
  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';
  return wx_getLocation().then(({ longitude, latitude }) => {
    let url = '/api/near/getNear';

    store.commit('setLocation', { longitude, latitude });
    url = urlParams(url, { id: store.state.user.id, longitude, latitude });
    return get(url, {}, '').then(res => parseRes(res, ''));
  });
}

/**
GET /api/near/upPrivateMsg
发送私信 --编号 003

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
发私信用户id

query	string
privateUserId	
收私信用户id

query	string
privateContent	
私信内容

query	string

 */
export function upPrivateMsg(id, content) {
  let url = '/api/near/upPrivateMsg';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId: store.state.user.id,
    privateUserId: id,
    privateContent: content
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
GET /api/near/collectUser
关注用户 --编号 004

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
关注用户id

query	string
collectUserId	
被关注用户id

query	string

 */
export function collectUser(id) {
  let url = '/api/near/collectUser';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId: store.state.user.id,
    collectUserId: id
  });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
GET /api/near/upjwd
提交经纬度 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
id	
id

query	string
token	
(required)
token

header	string
longitude	
经度

query	string
latitude	
纬度

query	string
 */
export function refreshLocation() {
  if (!!store.state.token) {
    return wx_getLocation().then(({ longitude, latitude }) => {
      let url = '/api/near/upjwd';
      store.commit('setLocation', { longitude, latitude });
      url = urlParams(url, { id: store.state.user.id, longitude, latitude });
      return get(url, {}, '').then(res => parseRes(res, ''));
    });
  }

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';
}

/**
GET /api/cityCode/selectPro
获取省级地区

Response Class (Status 200)
Successful — 请求已完成

ModelExample Value
JsonResult«KmwtCityCode» {
message (string, optional): 响应提示 ,
path (string, optional): 路径 ,
rows (KmwtCityCode, optional): 响应数据 ,
status (string, optional): 响应状态
}
KmwtCityCode {
adCode (string, optional),
cityCaption (string, optional),
cityOrder (integer, optional),
cityState (integer, optional),
createBy (string, optional),
createTime (string, optional),
params (object, optional),
parentCode (string, optional),
parentLevel (integer, optional),
remark (string, optional),
searchValue (string, optional),
updateBy (string, optional),
updateTime (string, optional)
}


 */
export function selectPro() {
  let url = '/api/cityCode/selectPro';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**

GET /api/login/updateMsgById
通过id更新用户信息 --编号 008

Response Class (Status 200)
Successful — 请求已完成 rows 直接返回token

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
id	
登录用户id或者关注用户id

query	string
userHead	
头像

query	string
userName	
名称

query	string
userPhone	
手机号

query	string
userPwd	
密码

query	string
schoolName	
学校名称

query	string
userSex	
性别

query	string
learnTarget	
目标

query	string



 */
export function updateMsgById(id, userInfo = {}) {
  let url = '/api/login/updateMsgById';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, { id, ...userInfo });
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/kmwt/getDepartment
获取部门接口 --编号 004

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "createTime": "string",
    "departmentName": "string",
    "departmentSort": 0,
    "id": 0,
    "isDel": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string



 */
export function getDepartment() {
  let url = '/api/kmwt/getDepartment';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/kmwt/getGwyLevel
获取公务员等级接口 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "createTime": "string",
    "id": 0,
    "isDel": 0,
    "levelName": "string",
    "levelSort": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string


 */
export function getGwyLevel() {
  let url = '/api/kmwt/getGwyLevel';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/kmwt/selectCity
获取下一级地区 --编号 003

Response Class (Status 200)
Successful — 请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "adCode": "string",
    "cityCaption": "string",
    "cityOrder": 0,
    "cityState": 0,
    "createBy": "string",
    "createTime": "2020-03-06T03:26:39.793Z",
    "params": {},
    "parentCode": "string",
    "parentLevel": 0,
    "remark": "string",
    "searchValue": "string",
    "updateBy": "string",
    "updateTime": "2020-03-06T03:26:39.793Z",
    "userNum": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
cityCode	
cityCode

query	string

 */
export function smwtSelectCity(cityCode) {
  let url = '/api/kmwt/selectCity';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, { cityCode });
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/kmwt/selectPro
获取省级地区 --编号002

Response Class (Status 200)
 */
export function kmwtSelectPro() {
  let url = '/api/kmwt/selectPro';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {});
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
/api/subjecAudio/teacherdetails
讲师详情 --编号 A005

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "brightSpot": "string",
    "header": "string",
    "id": 0,
    "introduce": "string",
    "motto": "string",
    "teacherName": "string",
    "teacherQualifications": "string",
    "upperBody": "string"
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
audioTimeSize	
audioTimeSize

query	string
token	
(required)
token

header	string
id	
(required)
讲师id 主键

query	string
 */
export function teacherDetails(id, audioTimeSize) {
  let url = '/api/subjecAudio/teacherdetails';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, { id, audioTimeSize });
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/subjecAudio/rateLearning
随听音频/部委课堂 更新学习进度 --编号 A004

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
(required)
用户id

query	string
subjectListId	
(required)
部委课堂主键/随听音频主键

query	string
studyLength	
(required)
已学习时间

query	string

 */
export function rateLearning(subjectListId, studyLength) {
  let url = '/api/subjecAudio/rateLearning';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, { subjectListId, studyLength });
  return get(url, {}, '').then(res => parseRes(res, ''));
}
/**
GET /api/subjecAudio/subjectCollect
关注音频或者视频 --编号 008

Response Class (Status 200)
手机号未注册

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
userId	
(required)
用户Id

query	string
labelId	
(required)
一级分类id

query	string
type	
(required)
2 音频 3 视频

query	string

 */
export function subjectCollect(labelId, type) {
  let url = '/api/subjecAudio/subjectCollect';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, { labelId, type, userId: store.state.user.id });
  return get(url, {}, '').then(res => parseRes(res, ''));
}

/**
 POST /api/subjecAudio/singscore
发布评论 --编号 A007

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
scoreAdd	
(required)

Parameter content type: 
scoreAdd

body	
ModelExample Value
留言列表 {
content (string, optional): 内容 ,
head (string, optional): 头像 ,
name (string, optional): 昵称 ,
score (integer, optional): 评分 五颗星 2分一颗星星 共10分 评分 ,
subjectListId (string, optional): 课程id ,
time (string, optional): 时间
}
 */

export function singscore(score, content, subjectListId) {
  let url = '/api/subjecAudio/singscore';
  // const loadingText = '正在登入...';
  // const errMsg = '登入失败';
  const data = {
    content,
    head: store.state.user.userHead,
    name: store.state.user.userName,
    score,
    subjectListId,
    time: new Date().toString()
  };
  return post(url, data, '').then(res => parseRes(res, ''));
}

export function getLocalLearnTime(learnTime) {
  const key = `${store.state.user.id}-learnTime`;
  wx.getStorage({
    key,
    success: ({ data }) => {
      if (data) {
        let _learnTime = JSON.parse(data);
        if (
          learnTime.id === _learnTime.id &&
          learnTime.learnState === _learnTime.learnState &&
          learnTime.remaindLearnTime < _learnTime.remaindLearnTime
        ) {
          // 用本地时间
          store.commit('setLearnTime', _learnTime);
          return;
        }
      }
      store.commit('setLearnTime', learnTime);
    },
    fail: () => {
      store.commit('setLearnTime', learnTime);
    }
  });
}

export function updateLocalLearnTime(learnTime) {
  // 多少时间更新
  const updateStep = 10;
  const key = `${store.state.user.id}-learnTime`;
  let pos = Promise.resolve();
  // 1分钟更新一次时间，或者从暂停状态恢复更新时间
  if (
    (store.state.learnTime.lastTime - learnTime.remaindLearnTime >=
      updateStep &&
      learnTime.learnState == 1) ||
    store.state.learnTime.learnState == 2
  ) {
    learnTime.lastTime = learnTime.remaindLearnTime;
    pos = learnTimeSuspend(learnTime.id, learnTime.remaindLearnTime, 1);
  }

  if (learnTime.learnState == 2) {
    //暂停
    pos = learnTimeSuspend(learnTime.id, learnTime.remaindLearnTime, 2);
  }

  if (learnTime.learnState == 3) {
    //结束
    learnTime.remaindLearnTime = 0;
    pos = learnTimeSuspend(learnTime.id, learnTime.remaindLearnTime, 3);
  }

  store.commit('setLearnTime', learnTime);

  wx.setStorage({
    key,
    data: JSON.stringify(learnTime)
  });

  return pos;
}
