import Vuex from '@wepy/x';
import { getImgUrlEx } from '@/common/utils';
const tabbar = [
  {
    icon: 'tabbar01@3x',
    activeIcon: 'tabbar01_pre@3x',
    page: '/pages/home',
    text: '开通联众'
  },
  {
    icon: 'tabbar02@3x',
    activeIcon: 'tabbar02_pre@3x',
    page: '/pages/homeSection2',
    text: '开明真题'
  },
  {
    icon: 'tabbar03@3x',
    activeIcon: 'tabbar03_pre@3x',
    page: '/pages/homeSection3',
    text: '开悟自我'
  }
].map(m => {
  m.icon = getImgUrlEx(m.icon);
  m.activeIcon = getImgUrlEx(m.activeIcon);
  return m;
});

const mockToken = null;
// const mockToken = 'dqBtp9EPY8Z8wlGcpJxJX6wPTT1XHwwkXmxOvHGU5RpwVSrOn2Yyq9lAbiLUk8voI0si38KxpXANo0tTuKjTe51yjyM7dPj6';

const userId = 3;

export default new Vuex.Store({
  state: {
    counter: 0,
    token: mockToken,
    queue: [],
    activeTabIndex: 0,
    tabbar,
    nickName: 'default Nickname',
    deviceId: 'deviceId',
    wx: {},
    userInfo: {},
    systemInfo: {},
    showMediaPlay: false,
    isMediaPlaying: false,
    playMedia: {},
    night: false,
    items: {},
    user: {
      id: 3,
      userName: '',
      learnTarget: '',
      learnTitle: '',
      schoolName: '',
      userIntegral: 0,
      learnNum: 0
    },
    location: null,
    totalOnlineNum: 0,
    learnTime: null,
    teacher: {},
    audio: null,
    audioInfo: {
      isPlaying: false,
      isSeeking: false,
      canDraging: false,
      totalTime: 0,
      currentTime: 0,
      curProgress: 0
    },
    playAudioInfo: null,
    userHideMediaPlayBar: false,
    audioSubject: null
  },
  mutations: {
    setSystemInfo(state, systemInfo) {
      state.systemInfo = systemInfo;
    },
    setTotalOnlineNum(state, totalOnlineNum) {
      state.totalOnlineNum = totalOnlineNum;
    },
    setItems(state, { items, type }) {
      const b = state.items[type] || [];
      const res = [...b, ...items];
      const obj = { ...state.items };
      obj[type] = res;
      state.items = obj;
    },
    resetItems(state, type) {
      state.items[type] = [];
    },

    changeTabbar(state, index) {
      state.activeTabIndex = index;
    },
    setShowMediaPlay(state, showMediaPlay) {
      state.showMediaPlay = showMediaPlay;
    },
    setMediaPlaying(state, isMediaPlaying) {
      state.isMediaPlaying = isMediaPlaying;
    },
    setPlayMedia(state, playMedia) {
      state.playMedia = playMedia;
    },
    setToken(state, token) {
      state.token = token;
    },
    setNight(state, night) {
      state.night = night;
    },
    pushQueue(state, url) {
      state.queue.push(url);
    },
    popQueue(state) {
      state.queue.pop();
    },
    setWxCode(state, code) {
      state.wx = { ...state.wx, code };
    },
    setWxSetting(state, setting) {
      state.wx = { ...state.wx, setting: { ...setting } };
    },
    setWxUserInfo(state, userInfo) {
      state.wx = { ...state.wx, userInfo: { ...userInfo } };
      state.userInfo = userInfo;
    },
    setUser(state, user) {
      state.user = user;
      state.activeTabIndex = 0;
      state.token = user ? user.token : null;
    },
    setLocation(state, location) {
      state.location = location;
    },
    setTeacher(state, teacher) {
      state.teacher = teacher;
    },
    setAudio(state, audio) {
      state.audio = audio;
    },
    setAudioInfo(state, audioInfo) {
      state.audioInfo = { ...state.audioInfo, ...audioInfo };
      console.log('state.audioInfo', state.audioInfo);
    },
    setPlayAudioInfo(state, playAudioInfo) {
      state.playAudioInfo = playAudioInfo;
    },
    setUserHideMediaPlayBar(state, userHideMediaPlayBar) {
      state.userHideMediaPlayBar = userHideMediaPlayBar;
    },
    setAudioSubject(state, audioSubject) {
      state.audioSubject = audioSubject;
    },
    setLearnTime(state, learnTime) {
      if (learnTime && !learnTime.lastTime) {
        learnTime.lastTime = learnTime.remaindLearnTime;
      }
      state.learnTime = learnTime;
    }
  },
  getters: {
    isSigned(state) {
      return !!state.token;
    },
    isLoading(state) {
      return state.queue.length > 0;
    },
    isMediaPlaying(state) {
      return state.isMediaPlaying;
    },
    showMediaPlay(state) {
      return state.showMediaPlay;
    },
    playMedia(state) {
      return state.playMedia;
    },
    night(state) {
      return state.night;
    },
    items(state) {
      return state.items;
    },
    user(state) {
      return state.user;
    },
    teacher(state) {
      return state.teacher;
    },
    location(state) {
      return state.location;
    },
    totalOnlineNum(state) {
      return state.totalOnlineNum;
    },
    wx(state) {
      return state.wx;
    },
    deviceId(state) {
      return state.deviceId;
    },
    userInfo(state) {
      return state.userInfo;
    },
    learnTime(state) {
      return state.learnTime;
    },
    audio(state) {
      return state.audio;
    },
    audioInfo(state) {
      return state.audioInfo;
    },
    playAudioInfo(state) {
      return state.playAudioInfo;
    },
    userHideMediaPlayBar(state) {
      return state.userHideMediaPlayBar;
    },
    audioSubject(state) {
      return state.audioSubject;
    }
  },
  actions: {}
});
