import { get, post } from './http';
import { showMsg, urlParams } from '@/common/utils';

const reg = /^2/;

function parseRes(res, errMsg = '请求失败', resolveStatus = [], tipStatus = []) {

  // const c = true;
  // if(typeof beforeCb === 'function'){
  //   c = beforeCb(res);
  // }
  //
  // if(!c){
  //   return;
  // }
  if ((!!res && reg.test(res.status)) || resolveStatus.includes(res.status) || tipStatus.includes(res.status)) {
    if (tipStatus.includes(res.status)) {
      return showMsg(res.message);
    }
    // return res.rows ? res.rows : res
    return res.rows;
  } else {
    const msg = res && res.message ? res.message : errMsg;
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
export function loginByWx(
  code,
  userHead,
  userName,
  userSex
) {
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
export function registerByWx(
  openid,
  userHead,
  userName,
  userPhone) {
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
 */
export function getupSleepClock(
  userId,
  clockType) {
  let url = '/api/getupSleep/clock';

  const loadingText = '打卡...';
  const errMsg = '打卡失败';

  url = urlParams(url, {
    userId,
    clockType
  });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg, [], ['2001']));
}


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
export function learnTimeAdd(
  userId,
  learnContent,
  learnTime
) {
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


