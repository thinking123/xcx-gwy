export const rpxTopx = {
  methods: {
    rpxTopx(rpx){
      return this.windowWidth/750 * rpx;
    },
  },
  created(){
    const {windowWidth} = wx.getSystemInfoSync();
    this.windowWidth = windowWidth;
    console.log('this.windowWidth ' , this.windowWidth )
  },
};
