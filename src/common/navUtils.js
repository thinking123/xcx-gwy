export function navToPage(toUrl) {
  console.log('nav to page : ' , toUrl)
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
