import { baseUrl } from '@/common/constant';
import store from 'store';

let queue = [];
let delay = null;
const state = store.state;

function showLoading(loadingText='') {
  delay = setTimeout(()=>{
    wx.showLoading({
      title: loadingText,
      mask: true
    });
  } , 100)
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
  queue.push(url);

  showLoading(loadingText);


  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: data,
      header: header,
      method: method,
      success: res => {
        hideLoading(loadingText);
        resolve(res ? res.data : null);
        queue.pop();
      },
      fail: err => {
        hideLoading(loadingText);
        reject(err);
        queue.pop();
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
