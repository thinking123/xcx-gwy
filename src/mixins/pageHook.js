export default {
  onShow() {
    const ch = this.$children;
    if (ch.length > 0) {
      ch.forEach(c => {
        if (c.$options && c.$options.pageHook && c.$options.pageHook.onShow) {
          c.$options.pageHook.onShow.call(c);
        }
      });
    }
  },
  onHide() {
    const ch = this.$children;
    if (ch.length > 0) {
      ch.forEach(c => {
        if (c.$options && c.$options.pageHook && c.$options.pageHook.onHide) {
          c.$options.pageHook.onHide.call(c);
        }
      });
    }
  }
};
