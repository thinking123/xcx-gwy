import Vuex from '@wepy/x';
import {getImgUrlEx} from '@/common/utils';

const tabbar = [
  {
    icon:'tabbar01@3x',
    activeIcon:'tabbar01_pre@3x',
    page:'/pages/home',
    text:'开通联众'
  },
  {
    icon:'tabbar02@3x',
    activeIcon:'tabbar02_pre@3x',
    page:'/pages/home',
    text:'开明真题'
  },
  {
    icon:'tabbar03@3x',
    activeIcon:'tabbar03_pre@3x',
    page:'/pages/home',
    text:'开悟自我'
  }
].map(m=>{
  m.icon = getImgUrlEx(m.icon)
  m.activeIcon = getImgUrlEx(m.activeIcon)
  return m;
});


export default new Vuex.Store({
  state: {
    counter: 0,
    token:null,
    queue:[],
    activeTabIndex:0,
    tabbar,
    nickName:'default Nickname',
    deviceId:'deviceId',
    wx:{}
  },
  mutations: {
    changeTabbar(state , index){
      state.activeTabIndex = index
    },
    setToken(state , token){
      console.log('token' , token)
      state.token = token
    },
    pushQueue(state , url){
      state.queue.push(url);
    },
    popQueue(state){
      state.queue.pop();
    },
    setWxCode(state , code){
      state.wx = {...state.wx , code}
    },
    setWxSetting(state , setting){
      state.wx = {...state.wx , setting:{...setting}}
    },
    setWxUserInfo(state , userInfo){
      state.wx = {...state.wx , userInfo:{...userInfo}}
    }
  },
  getters:{
    isSigned(state){
      return !!state.token;
    },
    isLoading(state){
      return state.queue.length > 0;
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment');
    },
    decrement ({ commit }) {
      commit('decrement');
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }
});
