import { baseUrl } from '@/common/constant';
import store from 'store';

let delay = {};
const state = store.state;
const { commit } = store;
function showLoading(loadingText = '', url) {
  if (loadingText === null) {
    return;
  }
  delay[url] = setTimeout(() => {
    console.log('loading');
    wx.showLoading({
      title: loadingText,
      mask: true
    });
  }, 300);
}

function hideLoading(loadingText = '', url) {
  wx.hideLoading();

  clearTimeout(delay[url]);
  delete delay[url];
}
function http(
  url,
  data,
  loadingText,
  header,
  _showLoading = true,
  method = 'GET'
) {
  // const app = getApp();
  if (url.indexOf('/') == 0) {
    url = url.substr(1);
  }

  if (
    state.token &&
    url &&
    ((url.indexOf('login') == -1 && url.indexOf('vcode') == -1) ||
      url.indexOf('getMsgById') == -1)
  ) {
    //授权token
    header.token = state.token;
    if (!header.token) {
      throw new Error('请登入');
    }
  }

  // Content-Type: application/json
  header['Content-Type'] = 'application/json';
  const _url = `${baseUrl}${url}`;
  console.log('url', _url);

  if (_showLoading) {
    commit('pushQueue', url);
    showLoading(loadingText, url);
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: data,
      header: header,
      method: method,
      success: res => {
        _showLoading && hideLoading(loadingText, url);
        _showLoading && commit('popQueue');
        resolve(res ? res.data : null);
      },
      fail: err => {
        _showLoading && hideLoading(loadingText, url);
        _showLoading && commit('popQueue');
        reject(err);
      }
    });
  });
}

export function get(
  url,
  params = {},
  loadingText = null,
  headers = {},
  showLoading = true
) {
  return http(url, params, loadingText, headers, showLoading);
}

export function post(
  url,
  data = {},
  loadingText = null,
  headers = {},
  showLoading = true
) {
  return http(url, data, loadingText, headers, showLoading, 'POST');
}
