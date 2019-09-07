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
