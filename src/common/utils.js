

export function getImgUrl(url) {
  console.log('image url: ' , url)
  return url;
}

export function getImgUrlEx(url) {

  if(url.indexOf('.png') == -1){
    url = `${url}.png`
  }
  url = `/static/icon/${url}`

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


export function showMsg(title, showIcon = false) {
  if (!title) {
    return
  }

  let icon = 'success'
  let isError = title instanceof Error ||
    typeof title !== 'string' ||
    //小程序 系统error
    (title.errMsg && title.errMsg.length > 0)

  if (isError) {
    //本地图标
    icon = 'fail'
    title = title.message ? title.message : title.errMsg
    title = title ? title : 'error'
  }

  if(title && title == '您因违规已被永久封禁'){
    console.log('locked ')
    return
  }
  let options = {
    title: title,
    mask: true
  }

  options = Object.assign(options, {icon: showIcon ? icon : 'none'})
  wx.showToast(options)

  console.log(title, icon, isError)
}


export function urlParams(url, params , noEncode = false) {
  let p = ''
  if(noEncode){
    p = Object.keys(params).map(function (key) {
      return [key, params[key]].join("=");
    }).join("&");
  }else{
    p = Object.keys(params).map(function (key) {
      return [key, params[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }

  if (p.length === 0) {
    return url
  }
  return `${url}?${p}`
}


// export function isDef(value: any): boolean {
//   return value !== undefined && value !== null;
// }

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function rpxTopx(rpx) {
  const app = getApp();
  // app.$wepy.$options
  const {globalData:{systemInfo:{windowWidth}}} = app.$wepy.$options;
  if(windowWidth){
      return rpx*windowWidth / 750;
  }else {
    console.error('not get store.state.systemInfo');
    return rpx;
  }
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// export function isNumber(value) {
//   return /^\d+$/.test(value);
// }
//
// export function range(num: number, min: number, max: number) {
//   return Math.min(Math.max(num, min), max);
// }
//
// export function nextTick(fn: Function) {
//   setTimeout(() => {
//     fn();
//   }, 1000 / 30);
// }
//
// let systemInfo: WechatMiniprogram.GetSystemInfoSuccessCallbackResult = null;
// export function getSystemInfoSync() {
//   if (systemInfo == null) {
//     systemInfo = wx.getSystemInfoSync();
//   }
//
//   return systemInfo;
// }
//
// export function addUnit(value?: string | number): string | undefined {
//   if (!isDef(value)) {
//     return undefined;
//   }
//
//   value = String(value);
//   return isNumber(value) ? `${value}px` : value;
// }
