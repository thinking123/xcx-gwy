import store from 'store';

function secondToMinus(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

class AudioHelper {
  ctx = null;
  isPlaying = false;
  isSeeking = false;
  _totalTime = 0;
  _currentTime = 0;
  canDraging = false;
  curProgress = 0;
  listens = Object.create(null);

  constructor() {
    const ctx = (this.ctx = wx.createInnerAudioContext());
    ctx.autoplay = false;
    ctx.obeyMuteSwitch = true;
    this.init();
  }

  emitEvent(evt, options) {
    const funs = this.listens[evt];
    if (funs && funs.length > 0) {
      funs.forEach(fun => {
        fun(options, this.ctx);
      });
    }
  }
  init() {
    const ctx = this.ctx;
    ctx.onPlay(() => {
      console.log('开始播放');
      const duration = Math.round(ctx.duration);
      this.isPlaying = true;
      this._totalTime = duration;
      this.canDraging = true;
      this.isSeeking = false;
      this.emitEvent('onPlay', {
        isPlaying: this.isPlaying,
        canDraging: this.canDraging,
        isSeeking: this.isSeeking,
        totalTime: this._totalTime
      });
    });

    ctx.onPause(() => {
      this.isPlaying = false;
      this.isSeeking = false;
      this.emitEvent('onPause', {
        isPlaying: this.isPlaying,
        isSeeking: this.isSeeking
      });
    });
    ctx.onStop(() => {
      console.log('onStop');
      this.isPlaying = false;
      this.isSeeking = false;
      this.emitEvent('onPause', {
        isPlaying: this.isPlaying,
        isSeeking: this.isSeeking
      });
    });
    ctx.onEnded(() => {
      this.isPlaying = false;
      this.isSeeking = false;
      this.emitEvent('onEnded', {
        isPlaying: this.isPlaying,
        isSeeking: this.isSeeking
      });
    });
    ctx.onTimeUpdate(() => {
      const currentTime = Math.round(ctx.currentTime);
      this._currentTime = currentTime;

      const curTime = secondToMinus(currentTime);

      const duration = Math.round(ctx.duration);

      let curProgress = this.curProgress;
      if (duration > 0 && !this.isDraging) {
        curProgress = ((currentTime * 1.0) / duration) * 100 + '%';
      }

      this.curProgress = curProgress;

      this._totalTime = duration;

      console.log('onTimeUpdate');
      this.emitEvent('onTimeUpdate', {
        isPlaying: this.isPlaying,
        isSeeking: this.isSeeking,
        curProgress: this.curProgress,
        currentTime: this._currentTime,
        totalTime: this._totalTime
      });
    });
    ctx.onError(() => {
      this.isPlaying = false;
      this.isSeeking = false;
      this.canDraging = false;

      this.emitEvent('onEnded', {
        isPlaying: this.isPlaying,
        isSeeking: this.isSeeking,
        canDraging: this.canDraging
      });
      console.log('onError');
    });
    ctx.onWaiting(() => {
      console.log('onWaiting');

      this.isSeeking = false;
      this.emitEvent('onEnded', {
        isSeeking: this.isSeeking
      });
    });
    ctx.onSeeking(e => {
      console.log('onSeeking', e);
      this.isSeeking = true;
      this.canDraging = false;

      this.emitEvent('onEnded', {
        isSeeking: this.isSeeking,
        canDraging: this.canDraging
      });
    });
    ctx.onSeeked(e => {
      console.log('onSeeked', e);
      this.canDraging = true;
      this.isSeeking = false;
      const currentTime = Math.round(ctx.currentTime);

      this.emitEvent('onEnded', {
        isSeeking: this.isSeeking,
        canDraging: this.canDraging,
        currentTime: currentTime
      });
    });
  }

  get currentTime() {
    return secondToMinus(this._currentTime);
  }

  get totalTime() {
    return secondToMinus(this._totalTime);
  }

  get context() {
    return this.ctx;
  }

  addEvents(options) {
    Object.keys(options).forEach(evt => {
      const fun = options[evt];
      const lst = this.listens[evt] || (this.listens[evt] = []);
      lst.push(fun);
    });
  }

  addEvent(evt, fun) {
    const lst = this.listens[evt] || (this.listens[evt] = []);
    lst.push(fun);
  }

  removeEvent(evt, fn) {
    if (!arguments.length) {
      this.listens = Object.create(null);
    }

    if (typeof evt === 'string') {
      const cbs = this.listens[evt];
      if (!cbs) return;
      let i = cbs.length;

      while (i-- > 0) {
        cb = cbs[i];
        if (cb === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }

    if (typeof evt === 'object') {
      Object.keys(evt).forEach(k => {
        const fun = evt[k];
        this.removeEvent(k, fun);
      });
    }
  }

  pause() {
    this.ctx.pause();
  }

  setSrc(src, playing = true) {
    if (this.ctx.src != src) {
      this.ctx.src = src;
      if (this.isPlaying) {
        this.stop();
      }
      playing && this.ctx.play();
    }
  }
  play(src) {
    if (src) {
      this.ctx.src = src;
    }
    this.ctx.play();
  }
  stop() {
    if (this.ctx) {
      this.ctx.stop();
    }
  }
  voice() {
    if (seek < 1 && seek > 0) {
      this.ctx.volume = seek;
    }
  }

  seek(seek) {
    if (
      this.ctx &&
      seek < 1 &&
      seek > 0 &&
      this.canDraging &&
      !this.isSeeking
    ) {
      seek = seek * this.ctx.duration;
      this.ctx.seek(seek);
    } else {
      this.ctx.seek(seek);
    }
  }

  destroy() {
    this.ctx.stop();
    this.ctx.destroy();
    this.ctx = null;
    this.removeEvent();
  }
}

class AudioConnect {
  constructor() {
    this.audio = store.state.audio;
    this.init();
  }

  init() {
    this.audio.addEvents({
      onPlay: this.onAudio.bind(this),
      onPause: this.onAudio.bind(this),
      onStop: this.onAudio.bind(this),
      onEnded: this.onAudio.bind(this),
      onTimeUpdate: this.onAudio.bind(this),
      onError: this.onAudio.bind(this),
      onWaiting: this.onAudio.bind(this)
    });
  }

  onAudio(options) {
    store.commit('setAudioInfo', options);
  }

  play(media) {
    const playAudioInfo = store.state.playAudioInfo || {};
    const audioInfo = store.state.audioInfo;
    const { commit } = store;

    if (media.id === playAudioInfo.id) {
      this.audio[audioInfo.isPlaying ? 'pause' : 'play'];
    } else {
      if (playAudioInfo.id) {
        this.audio.stop();
      }
      this.audio.play(media.url);
      commit('setPlayAudioInfo', media);
    }

    if (this.audio.isPlaying) {
      commit('setUserHideMediaPlayBar', false);
    }
  }
}
let audioConnect = null;
let audio = null;
if (!store.state.audio) {
  audio = new AudioHelper();
  audioConnect = new AudioConnect();
}

// export  ;
export { audioConnect, audio };
