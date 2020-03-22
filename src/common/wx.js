import store from 'store';
const commit = store.commit;

export function _wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //此处通过code 获取 服务端token
        console.log('code', res.code);

        commit('setWxCode', res.code);
        resolve(res.code);
      },
      fail: err => {
        console.log('login error', err);
        reject(err);
      }
    });
  });
}

export function _clearStorage() {
  return new Promise((resolve, reject) => {
    wx.clearStorage({
      success: res => {
        resolve(res);
      },
      fail: err => {
        console.log('login error', err);
        reject(err);
      }
    });
  });
}

export function _wxLogout() {
  return _clearStorage().then(() => {
    commit('resetState');
    wx.hideLoading();
    wx.reLaunch({
      url: '/pages/login/login'
    });
  });
}

export function _wxGetSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        commit('setWxSetting', res.authSetting);
        resolve(res.authSetting);
      },
      fail: reject
    });
  });
}

export function _wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        commit('setWxUserInfo', res.userInfo);
        resolve(res.userInfo);
      },
      fail: reject
    });
  });
}

export function join(dir, file) {
  return `${dir}/${file}`;
}
export function wx_isExist(fs, filedirName) {
  return new Promise((resolve, reject) => {
    fs.access({
      path: filedirName,
      success: r => resolve(true),
      fail: r => resolve(false)
    });
  });
}
export function wx_mkDir(fs, dirPath, recursive = true) {
  return new Promise((resolve, reject) => {
    fs.mkdir({
      dirPath: dirPath,
      recursive: recursive,
      success: resolve,
      fail: reject
    });
  });
}

export function wx_rmdir(fs, dirPath, recursive = true) {
  return new Promise((resolve, reject) => {
    fs.rmdir({
      dirPath: dirPath,
      recursive: recursive,
      success: resolve,
      fail: reject
    });
  });
}

export function wx_saveFile(fs, tempFilePath, filePath) {
  return new Promise((resolve, reject) => {
    fs.saveFile({
      filePath: filePath,
      tempFilePath: tempFilePath,
      success: resolve,
      fail: reject
    });
  });
}

export function wx_chooseMessageFile(count, type = 'all', extension = []) {
  return new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      count: count,
      type: type,
      extension: extension,
      success: resolve,
      fail: err => {
        console.log('wx_chooseMessageFile', err);
        resolve(false);
      }
    });
  });
}

export function wx_uploadFile(url, filePath, name, header, cb) {
  return new Promise((resolve, reject) => {
    const uploadTask = wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: header,
      success: resolve,
      fail: reject
    });

    if (typeof cb === 'function') {
      cb(uploadTask);
    }
  });
}

export function wx_chooseImage(count) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      success: resolve,
      fail: reject
    });
  });
}

export function wx_getSystemInfo() {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: resolve,
      fail: reject
    });
  });
}

export function wx_getLocation(obj = {}) {
  // wx.getLocation
  return new Promise((resolve, reject) => {
    wx.getLocation({
      ...obj,
      ...{
        success: resolve,
        fail: reject
      }
    });
  });
}
