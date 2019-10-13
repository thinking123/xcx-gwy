import {basic} from '@/mixins/basic';

Component({
  properties: {
    items:Array,
    total:Number,
    curIndex:{
      type:Number,
      value:0
    },
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
    windowWidth:'auto',
    windowHeight:'auto',
    tsx:0,
    //transform 0.3s;
    tst:'',
    isSwiping:false,
    animationing:false,
    catchMove:false,
    wrapWidth:'auto'
  },
  methods: {
    emit(...args) {
      this.triggerEvent(...args);
    },
    noop() {
      console.log('noop' )
    },
    touchStart(event) {
      const {animationing} = this.data;
      console.log('touchStart')
      if(animationing){
        // event.preventDefault();
        return;
      }
      const touch = event.touches[0];

      this.setData({
        direction:'',
        deltaX:0,
        deltaY:0,
        offsetX:0,
        offsetY:0,
        startX:touch.clientX,
        startY:touch.clientY,
        firstDirection:'',
        isSwiping:true
      })
    },

    touchMove(event) {
      const { startX, startY, offsetX, offsetY, animationing, firstDirection, windowWidth ,isSwiping} = this.data;
      if (animationing || !isSwiping) {
        return;
      }
      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const direction =
        offsetX > offsetY
          ? 'horizontal'
          : offsetX < offsetY
          ? 'vertical'
          : '';

      this.setData({
        direction,
        deltaX,
        deltaY,
        offsetX: Math.abs(deltaX),
        offsetY: Math.abs(deltaY),
        firstDirection: ''
      });

      if (!firstDirection) {
        this.setData({
          firstDirection: direction,
          catchMove: direction == 'horizontal'
        });
      }
      if (firstDirection == 'vertical') {
        return;
      }

      const swipeLen = -windowWidth + deltaX;
      this.setData({
        tsx: swipeLen,
        swipeLen
      });
    },
    touchEnd(event){
      const { windowWidth, deltaX, swipeLen, curIndex, total, animationing ,isSwiping} = this.data;
      if (animationing || !isSwiping) {
        return;
      }


      console.log('touchEnd');
      const speed = 300;
      const minSwipe = 0.5;
      const swipeRate = Math.abs(deltaX / windowWidth);
      let swipeDir = 0;
      console.log('swipeRate', swipeRate);
      let tsx = 0;

      if (swipeRate > minSwipe) {
        if (Math.abs(swipeLen) > windowWidth) {
          if (curIndex < total - 1) {
            //swipe left
            tsx = -windowWidth * 2;
            swipeDir = 1;
          } else {
            tsx = -windowWidth;
          }

        } else {
          if (curIndex > 0) {
            tsx = 0;
            swipeDir = -1;
          } else {
            tsx = -windowWidth;
          }
        }
      } else {
        tsx = -windowWidth;
      }
      let tst = `transform ${speed}ms cubic-bezier(0.18, 0.89, 0.32, 1)`;

      this.setData({
        tsx,
        tst,
        animationing:true
      }, () => {
        this.animationTimer = setTimeout(() => {
          if (swipeDir != 0) {
            this.emit('swipe', curIndex + swipeDir);
          }
          setTimeout(() => {
            this.setData({
              tsx: -windowWidth,
              tst: ''
            }, () => {
              setTimeout(() => {
                this.setData({
                  animationing:false,
                  catchMove:false,
                  isSwiping:false
                })
              }, 10);
              delete this.animationTimer;
            });
          } , 100)




        }, speed);
      });

    }
  },
  attached() {
    const {windowWidth , windowHeight} = wx.getSystemInfoSync();
    this.setData({
      windowWidth,
      windowHeight,
      tsx: -windowWidth,
      wrapWidth:`${windowWidth*3}px`
    })
  }
})
