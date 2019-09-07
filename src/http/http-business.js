import { get, post } from './http';
import { urlParams } from '@/common/utils';

function parseRes(res, errMsg, resolveStatus = []) {
  if (!!res && res.status && res.status.indexOf('2') > -1) {
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

  url = urlParams(url, { userPhone, userPwd, deviceId });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * / api/login/loginByWx
 微信登陆 --编号
 * @param openid
 * @param deviceId
 * @returns 请求已完成 rows 直接返回token
 */
export function loginByWx(openid, deviceId) {
  let url = '/api/login/loginByWx';
  const loadingText = '正在登入...';
  const errMsg = '登入失败';

  url = urlParams(url, { openid, deviceId });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * /api/login/registerByPhone
 手机号注册
 * @param userPhone
 * @param userPwd
 * @returns 请求已完成 ROW 直接返回 TOKEN
 */
export function registerByPhone(userPhone, userPwd) {
  let url = '/api/login/loginByWx';
  const loadingText = '正在注册...';
  const errMsg = '注册失败';

  url = urlParams(url, { userPhone, userPwd });
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
