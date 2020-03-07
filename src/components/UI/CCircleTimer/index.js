import Circle from '../CircleTimer';
import { isEmptyObject } from '@/common/utils';
import { mapGetters, mapState, mapMutations, mapActions } from '@wepy/x';
import store from 'store';
import { updateLocalLearnTime } from '@/http/http-business';

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'value value'
    },
    width: {
      type: Number,
      value: 750
    },
    height: {
      type: Number,
      value: 750
    },
    startTime: {
      type: Number,
      value: new Date().getTime()
    },
    endTime: {
      type: Number,
      value: new Date().getTime()
    },
    secRadius: {
      type: Number,
      value: 215
    },
    minRadius: {
      type: Number,
      value: 255
    },
    hourRadius: {
      type: Number,
      value: 315
    }
  },
  observers: {
    startTime() {
      this.updateTime();
    },
    endTime() {
      this.updateTime();
    }
  },
  attached() {
    const learnTime = store.state.learnTime;
    const startTime = new Date();
    const endTime = startTime + learnTime.remaindLearnTime * 1000;
    const isStop = learnTime.learnState == 3;
    const isPause = learnTime.learnState == 2;
    this.circle = new Circle({
      startTime,
      endTime,
      width: this.data.width,
      height: this.data.height,
      secRadius: this.data.secRadius,
      minRadius: this.data.minRadius,
      hourRadius: this.data.hourRadius,
      attached: this,
      ratio: 1,
      isStop,
      isPause,
      endCb: this.endCb.bind(this),
      secondCb: this.secondCb.bind(this)
    });
    this.setData({
      isStop,
      isPause
    });
  },
  detached() {
    if (this.circle) {
      this.circle.dispose();
      this.circle = null;
    }
  },

  data: {
    isStop: false,
    isPause: false,
    isOperating: false
  },
  methods: {
    endCb() {
      updateLocalLearnTime({
        ...store.state.learnTime,
        remaindLearnTime: 0,
        learnState: 3
      }).then(() => {
        return this._setData({
          isStop: true
        });
      });
    },
    _setData(d) {
      return new Promise((res, rej) => {
        this.setData(d, res);
      });
    },
    secondCb(hs, remaindLearnTime) {
      updateLocalLearnTime({
        ...store.state.learnTime,
        remaindLearnTime
      });
    },
    updateTime() {
      if (this.circle) {
        this.circle.setTimeRange(
          new Date(this.data.startTime),
          new Date(this.data.endTime)
        );
      }
    },
    handleStop: function() {
      const learnTime = store.state.learnTime;

      const isStop = learnTime.learnState == 3;

      if (isStop || this.data.isOperating) {
        return;
      }
      this._setData({ isOperating: true })
        .then(() => {
          return updateLocalLearnTime({
            ...learnTime,
            learnState: 3
          });
        })
        .then(res => {
          if (res) {
            this.circle.stop();
            return this._setData({
              isStop,
              isOperating: false
            });
          }
        });
    },
    handlePause: function() {
      const learnTime = store.state.learnTime;

      const isPause = learnTime.learnState == 2;
      const isStop = learnTime.learnState == 3;

      if (isStop || this.data.isOperating) {
        return;
      }
      this._setData({ isOperating: true })
        .then(() => {
          return updateLocalLearnTime({
            ...learnTime,
            learnState: isPause ? 1 : 2
          });
        })
        .then(res => {
          if (res) {
            this.circle[isPause ? 'resume' : 'pause']();
            return this._setData({
              isPause: !isPause,
              isOperating: false
            });
          }
        });
    }
  }
});
