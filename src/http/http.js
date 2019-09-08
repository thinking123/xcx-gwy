import { baseUrl } from '@/common/constant';
import store from 'store';

let delay = null;
const state = store.state;
const {commit} = store;

function showLoading(loadingText='') {
  delay = setTimeout(()=>{
    wx.showLoading({
      title: loadingText,
      mask: true
    });
  } , 300)
}

function hideLoading(loadingText='') {
  wx.hideLoading();
  clearInterval(delay)
  delay = null;
}
function http(url, data, loadingText, header, method = 'GET') {

  // const app = getApp();
  if (url.indexOf('/') == 0) {
    url = url.substr(1);
  }


  if (state.token && url && url.indexOf('login') == -1) {
    //授权token
    header.token = state.token;
  }

  // Content-Type: application/json
  header['Content-Type'] = 'application/json';
  const _url = `${baseUrl}${url}`;
  console.log('url', _url);

  commit('pushQueue' , url)
  showLoading(loadingText);


  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: data,
      header: header,
      method: method,
      success: res => {
        hideLoading(loadingText);
        commit('popQueue')
        resolve(res ? res.data : null);

      },
      fail: err => {
        hideLoading(loadingText);
        commit('popQueue')
        reject(err);
      }
    });
  });
}

export function get(url, params = {}, loadingText = null, headers = {}) {
  return http(url, params, loadingText, headers);
}

export function post(url, data = {}, loadingText = null, headers = {}) {
  return http(url, data, loadingText, headers, 'POST');
}
