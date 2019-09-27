export const basic = {
  methods: {
    // $emit(...args) {
    //   this.triggerEvent(...args);
    // },

    getRect(selector, all) {
      return new Promise(resolve => {
        wx.createSelectorQuery()
          .in(this.$wx)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            console.log('rect' , rect)
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }

            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
      });
    }
  }
};
