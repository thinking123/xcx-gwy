import { get, post } from './http';
import { urlParams } from '@/common/utils';

const reg = /^2/;

function parseRes(res, errMsg, resolveStatus = []) {
  if (!!res && reg.test(res.status)) {
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
