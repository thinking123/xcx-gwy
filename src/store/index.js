import Vuex from '@wepy/x';

const tabbar = [

];
export default new Vuex.Store({
  state: {
    counter: 0,
    token:null,
    queue:[],
    activeTabIndex:0,
    tabbar
  },
  mutations: {
    increment (state) {
      state.counter++;
    },
    decrement (state) {
      state.counter--;
    },
    changeTabbar(index){
      state.activeTabIndex = index
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
