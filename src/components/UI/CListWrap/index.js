import {basic} from '@/mixins/basic';

import eventHub from '@/common/eventHub';

Component({
  properties: {
    total:Number,
    threshold:{
      type:Number,
      value:1000
    },
    url:String,
    eventName:{
      type:String,
      value:'clistwrap'
    }
  },
  externalClasses:[
    'external-cls'
  ],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
  },
  data: {
    items:[],
    isEnd:false,
    isLoading:false,
    page:1,
  },
  methods: {
    intersectionCb(res){
      const {isLoading,isEnd, threshold} = this.data;
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度

      console.log('relativeToViewport',res,res.boundingClientRect.top )
      const canload = res.boundingClientRect.top

      // this.getRect().then(rect=>{
      //   console.log("rect", rect);
      // })

      console.log("rect", this);
      if(!isLoading && !isEnd ){
        this.getData();
      }
    },
    request(url){
      return new Promise((res , rej) => {
        setTimeout(()=>{
          let arr = []
          for(let i = 0 ; i < 10 ; i++){
            arr.push({
              text:`arr text z; ${i}`,
              date:Date.now(),
              id:Math.random() * 100 ,
            })
          }
          const data = {
            status:200,
            data:{
              items:arr,
            }
          }
          res(data);
        },1000);
      });
    },
    getData(){
      this.setData({
        isLoading:true,
      },()=>{
        const {eventName, url, items , page} = this.data;
        this.request().then(({data:{items:res}}) => {
          const _items = [...items, ...res];
          if(_items.length > 125){
            this.setData({
              isLoading:false,
              isEnd:true,
            });

            if(this.ob){
              this.ob.disconnect();
            }


          }else{
            this.setData({
              isLoading:false,
              items:_items,
            })

            eventHub.$emit(eventName, { items:_items});
          }

        }).catch(err=>{
          console.log('err',err)
        });
      })



    },
    getRect(selector, all) {
      return new Promise(resolve => {
        wx.createSelectorQuery()
          .in(this)['selectViewport']()
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
  },
  created() {
    console.log('created');
    this.ob = wx.createIntersectionObserver(this, {
      thresholds:[0,1]
    });
  },
  attached() {
    console.log('attached');
    const {threshold} = this.data;
    this.ob.relativeToViewport({bottom: 0}).observe('.CListWrap-dst', this.intersectionCb.bind(this))
  }
})
