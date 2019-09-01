import {get, post} from "./http";
import {urlParams} from '@/common/utils';

function parseRes(res, errMsg, resolveStatus = []) {
    if (!!res && res.status && res.status.indexOf('2') > -1) {
        // return res.rows ? res.rows : res
        return res.rows
    } else {
        const msg = res && res.message ? res.message : errMsg
        throw new Error(msg ? msg : 'error')
    }
}

//登入
export function wxLogin(code, userHead, userName, userSex) {
    const url = '/api/login/wxlogin'
    const loadingText = '正在登入...'
    const errMsg = '登入失败'
    const data = {
        code: code,
        userHead: userHead,
        userName: userName,
        userSex: userSex
    }
    return post(url, data, loadingText).then(res => parseRes(res, errMsg))
}


//是否注册过
export function isSignUp() {
    const url = '/api/singUp/isSingUp'
    const data = {}
    return post(url, data).then(res => {
        console.log('isSignUp', res)
        if (res && res.status == '9006') {
            return true
        } else if (res && res.status == '9007') {
            return false
        }  else {
            throw new Error(res.message ? res.message : '请求失败')
        }
    })
}

//注册
export function signUp(userName,
                       userPhone,
                       userProvinceId,
                       userPointId,
                       userSchoolName) {
    const url = '/api/singUp'
    const loadingText = '正在注册...'
    const errMsg = '注册失败'
    const data = {
        userName: userName,
        userPhone: userPhone,
        userPointId: userPointId,
        userProvinceId: userProvinceId,
        userSchoolName: userSchoolName,
    }
    return post(url, data, loadingText).then(res => parseRes(res, errMsg))

}
