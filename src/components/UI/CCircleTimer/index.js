import Circle from '../CircleTimer'
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'value value',
    },
    width:{
      type:Number,
      value:750
    },
    height:{
      type:Number,
      value:750
    },
    startTime:{
      type:Date,
      value:new Date()
    },
    endTime:{
      type:Date,
      value:new Date()
    },
    secRadius:{
      type:Number,
      value:215
    },
    minRadius:{
      type:Number,
      value:255
    },
    hourRadius:{
      type:Number,
      value:315
    },
  },
  attached(){
    // const ctx = wx.createCanvasContext('canvas' , this)
    // ctx.rect(10, 10, 150, 75)
    // ctx.setFillStyle('yellow')
    // ctx.fill()
    // ctx.draw()


    const sel = this.createSelectorQuery().select('.canvas');
    console.log('sel:' , sel);
    sel.node(function(res){
      console.log('res.node' , res) // 节点对应的 Canvas 实例。
    }).exec()


    //
    this.circle = new Circle({
      startTime: new Date(),
      endTime:  new Date(),
      width: this.data.width,
      height: this.data.height,
      secRadius: this.data.secRadius,
      minRadius: this.data.minRadius,
      hourRadius: this.data.hourRadius,
      attached:this,
      ratio:10
    });
    //
    const offset = 1000 * (26 + 3 * 60 + 2 * 3600);
    const t = new Date(new Date().setTime(new Date().getTime() + offset));
    this.circle.setTimeRange(new Date() , t);
    //





  },
  data: {
    isStop:false,
    isPause:false
  },
  methods: {
    handleStop: function() {
      if(this.data.isStop){
        return;
      }
      if(this.circle){
        this.circle.stop();
        this.setData({
          isStop:true
        })
      }
    },
    handlePause: function() {
      if(this.data.isPause){
        this.circle.resume();
        this.setData({
          isPause:false
        })
      }else{
        this.circle.pause();
        this.setData({
          isPause:true
        })
      }
    }
  }
})
