export function navToPage(toUrl , query = {}) {


  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  const route = curPage.route;
  query.referrer = route;
  if(query){
    toUrl = Object.keys(query).reduce((f , key , index)=>{
      return `${f}${index == 0 ? '' : '&'}${key}=${query[key]}`
    } , `${toUrl}?`);
  }
  const nav = {
    url:toUrl
  }

  console.log('nav to page : ' , nav)
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
