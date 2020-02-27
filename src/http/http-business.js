import { get, post } from './http';
import { showMsg, urlParams } from '@/common/utils';

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

  const loadingText = '打卡...';
  const errMsg = '打卡失败';

  url = urlParams(url, {
    id: userId
  });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
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
export function learnTimeSuspend(id, remaindLearnTime) {
  let url = ' /api/learnTime/suspend';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    id,
    remaindLearnTime
  });
  return get(url, {}, '').then(res => parseRes(res, '', [], [2001]));
}

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
export function forumforumCollect(userId, labelId) {
  let url = '/api/forum/forumCollect';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
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
export function forumuserCollect(userId, collectUserId) {
  let url = '/api/forum/userCollect';

  // const loadingText = '打卡...';
  // const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
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
  let url = '/api/login/wxlogin';
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
