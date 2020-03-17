export default function share(options) {
  return {
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }

      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      const route = curPage.route;

      const defOpt = {
        title: '分享',
        path: route
      };

      const obj = this.getShareOptions ? this.getShareOptions() : {};
      return {
        ...defOpt,
        ...options,
        ...obj
      };
    }
  };
}
