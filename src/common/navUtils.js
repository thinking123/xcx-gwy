export function navToPage(toUrl , query) {
  console.log('nav to page : ' , toUrl)
  if(query){
    toUrl = Object.keys(query).reduce((f , key , index)=>{
      return `${f}${index == 0 ? '' : '&'}${key}=${query[key]}`
    } , `${toUrl}?`);
  }
  const nav = {
    url:toUrl
  }
  wx.navigateTo(nav)
}
export function redirectTo(toUrl) {
  console.log('nav to page : ' , toUrl)
  const nav = {
    url:toUrl
  }
  wx.redirectTo(nav)
}

export function reLaunch(toUrl) {
  console.log('nav to page : ' , toUrl)
  const nav = {
    url:toUrl
  }
  wx.reLaunch(nav)
}

export function navBack() {
  wx.navigateBack();
}
