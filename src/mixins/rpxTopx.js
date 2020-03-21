import { wx_getSystemInfo } from '@/common/wx';

export const rpxTopx = {
  methods: {
    rpxTopx(rpx) {
      return (this.windowWidth / 750) * rpx;
    },
    _rpxTopx(rpx) {
      if (!this.sysInfo) {
        return this.getSystemInfo().then(sysInfo => {
          const { windowWidth } = sysInfo;
          return (this.windowWidth / 750) * rpx;
        });
      } else {
        const { windowWidth } = this.sysInfo;
        return Promise.resolve((windowWidth / 750) * rpx);
      }
    },
    getSystemInfo() {
      if (!this.sysInfo) {
        return wx_getSystemInfo().then(sysInfo => {
          this.sysInfo = sysInfo;
          return sysInfo;
        });
      } else {
        return Promise.resolve(this.sysInfo);
      }
    }
  },
  created() {
    this.sysInfo = wx.getSystemInfoSync();
    const { windowWidth } = this.sysInfo;
    this.windowWidth = windowWidth;
  }
};
