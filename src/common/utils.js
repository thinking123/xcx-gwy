export function getImgUrl(url) {
  console.log('image url: ' , url)
  return url;
}

export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isPhone(p) {
  const phoneReg = /^1[3456789]\d{9}$/;

  return phoneReg.test(p);
}


export function showMsg(title , icon = 'none') {
  const obj = {
      title,
      icon
  }
  wx.showToast(obj)
}
