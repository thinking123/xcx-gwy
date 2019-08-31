export default {
  data: {
    mixin: 'utilMixin'
  },
  methods: {
    getImgUrl (url) {
      console.log('get image url : ' , url);
      return url;
    }
  },
  created(){
    console.log('create mixins')
  }
}
