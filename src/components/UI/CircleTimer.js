const {windowWidth} = wx.getSystemInfoSync();


export default class Circle {

  keyRunTime = 'local-circle-timer-run-time';
  isPause = false;
  isStop = false;
  keyFrames = 1000/60;
  constructor(options) {
    const def = {
      bgColor: '#FFF',
      secColor: '#FFF',
      minColor: '#FFF',
      hourColor: '#FFF',
      runColor: '#FFF',
      drawColor: '#FFF',

      endCb: () => {
        console.log('end');
      },
      pauseCb:() => {
        console.log('pauseCb');
      },
      stopCb:() => {
        console.log('stopCb');
      },
      resumeCb:() => {
        console.log('resumeCb');
      },
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      curTime: new Date().getTime(),
      countDown: '',
      down: true,
      secRadius:0,
      minRadius:0,
      hourRadius:0,
      ratio:1,
      step:false,
      canvasId:'canvas',
      width:'',
      height:'',
      fontSize:'80',
      fontColor:'#FFF',
      attached:null,
      lineWidth:4,
      secLineWidth:4,
      minLineWidth:4,
      hourLineWidth:4,
    };

    this.opts = { ...def, ...options };

    let { secRadius, minRadius, hourRadius, width, height, fontSize, countDown ,lineWidth,secLineWidth,minLineWidth,hourLineWidth} = this.opts;

    if (!countDown) {
      const { startTime, endTime } = this.opts;

      this.opts.countDown = endTime.getTime() - startTime.getTime();
    }
    secRadius = this.rpxTopx(secRadius);
    minRadius = this.rpxTopx(minRadius);
    hourRadius = this.rpxTopx(hourRadius);
    width = this.rpxTopx(width);
    height = this.rpxTopx(height);
    fontSize = this.rpxTopx(fontSize);
    lineWidth = this.rpxTopx(lineWidth);
    secLineWidth = this.rpxTopx(secLineWidth);
    minLineWidth = this.rpxTopx(minLineWidth);
    hourLineWidth = this.rpxTopx(hourLineWidth);

    this.secLineWidth = secLineWidth;
    this.minLineWidth = minLineWidth;
    this.lineWidth = lineWidth;
    this.hourLineWidth = hourLineWidth;
    this.fontSize = fontSize;
    this.width = width;
    this.height = height;
    const radius = Math.min(width, height) - 2;
    this.secRadius = secRadius || radius * (1 / 6.0);
    this.minRadius = minRadius || radius * (2 / 6.0);
    this.hourRadius = hourRadius || radius * (3 / 6.0);
    this.center = {
      x: width / 2,
      y: height / 2
    };

    this.ctx = this.canvasContext;

    this.renderBg();
  }

  rpxTopx(rpx){
    return windowWidth/750 * rpx;
  }


  degreeToRadian(deg) {
    return (Math.PI / 180) * deg;
  }

  get canvasContext(){
    if(!this.ctx){
      const {canvasId , attached} = this.opts;
      this.ctx = wx.createCanvasContext(canvasId , attached);
    }
    return this.ctx;
  }

  get requestAnimationFrame(){
    return this.fakeAnimationFrame;
      if(this.ctx){
          return this.ctx.requestAnimationFrame
      }else{
          return setTimeout
      }
  }

  fakeAnimationFrame(callback){
    var start,
      finish;
    setTimeout(function(){
      start = +new Date();
      callback(start);
      finish = +new Date();

      //   //console.log(finish - start);

    },16);
  }
  renderBg() {
    const { x, y } = this.center;
    const c = this.ctx;
    const deg360 = this.degreeToRadian(360);
    this.renderCircle(0, deg360, this.secRadius, this.opts.secColor , this.secLineWidth,0.2);
    this.renderCircle(0, deg360, this.minRadius, this.opts.minColor, this.minLineWidth,0.3);
    this.renderCircle(0, deg360, this.hourRadius, this.opts.hourColor, this.hourLineWidth,0.1);
  }

  renderCircle(start, end, r, strokeStyle, lineWidth = 2 , opticy = 1) {
    const { x, y } = this.center;
    const c = this.ctx;
    const offset = this.degreeToRadian(-90);

    c.setGlobalAlpha(opticy);
    c.beginPath();
    // c.lineWidth = lineWidth;
    c.setLineWidth(lineWidth);
    // c.strokeStyle = strokeStyle;
    c.setStrokeStyle(strokeStyle);
    c.arc(x, y, r, offset + start, offset + end);
    // c.closePath();
    c.stroke();


  }


  getId() {
    return 'canvas';
  }

  render() {
    this.start = new Date().getTime();

    this.renderTime();
  }

  twoBits(b) {
    if (b < 10) {
      return `0${b}`;
    }
    return `${b}`;
  }

  formatTime([h, m, s]) {
    s = Math.floor(s);
    m = Math.floor(m);
    h = Math.floor(h);
    return `${this.twoBits(h)}:${this.twoBits(m)}:${this.twoBits(s)}`;
  }

  renderText([h, m, s]){
    const strTime = this.formatTime([h, m, s]);
    this.ctx.setGlobalAlpha(1);
    this.ctx.textAlign = 'center';
    // this.ctx.font = `${this.fontSize}px`;
    this.ctx.setFillStyle(this.opts.fontColor);
    this.ctx.setFontSize(this.fontSize);
    this.ctx.textBaseline = 'middle';

    this.ctx.fillText(strTime, this.center.x, this.center.y);
  }

  renderTime() {
    if(this.isPause || this.isStop){
      return;
    }
    const { countDown } = this.opts;
    let diff = (new Date().getTime()) - this.start;
    diff = diff * this.opts.ratio;
    if (this.opts.down) {
      diff = countDown - diff;
    }

    const [h, m, s] = this.timeToDate(diff);


    if (this.opts.down) {
      if (diff <= 0) {
        console.log(h, m , s)
        this.end();
        return;
      }
    } else {
      if (diff >= countDown) {
        this.end();
        return;
      }
    }

    this.renderTimeBg([h, m, s]);

    if (this.opts.down) {
      if (diff > 0) {
        this.requestAnimationFrame(this.renderTime.bind(this) , this.keyFrames);
      } else {
        this.end();
      }
    } else {
      if (diff < countDown) {
        this.requestAnimationFrame(this.renderTime.bind(this), this.keyFrames);
      } else {
        this.end();
      }
    }

  }

  clear(){
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  end() {
    if (this.opts.down) {
      // this.ctx.clearRect(0, 0, this.width, this.height);
      this.renderTimeBg([0,0,0])
    }


    this.isStop = true;

    this.opts.endCb();
  }

  stop(){
    this.isStop = true;

  }

  pause() {
    this.isPause = true;
    let diff = (new Date().getTime()) - this.start;
    wx.setStorage({
      key: this.keyRunTime,
      data:diff,
      success:() => {
        this.opts.pauseCb(diff);
      }
    });
  }

  resume(){
    if(this.isStop){
      return;
    }
    wx.getStorage({
      key:this.keyRunTime,
      success: ({data:diff}) => {
        if(this.opts.down){
          // this.opts.countDown -= diff;
          this.start = (new Date()).getTime() - diff;
        }else{
          this.start = diff;
        }
        this.isPause = false;
        this.opts.resumeCb();
        this.renderTime();
      }
    })
  }

  renderTimeToCircle(deg, r) {
    this.renderCircle(0, deg, r, this.opts.drawColor, this.lineWidth);
  }


  timeToDate(time) {
    if(this.opts.step){
      const t =Math.floor( time / 1000);
      const h = Math.floor(t / (60 * 60));
      const m = Math.floor((t - h * 60 * 60) / 60);
      const s = (time - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000;
      
      return [h, m, s];
    }else{
      const t = time / 1000;
      const h = t / (60 * 60);
      const m = (t - Math.floor(h) * 60 * 60) / 60;
      const s = (time - Math.floor(h) * 60 * 60 * 1000 - Math.floor(m) * 60 * 1000) / 1000;

      return [h, m, s];
    }
  }

  setTimeRange(startTime , endTime){
    this.opts.startTime = startTime || this.opts.startTime;
    this.opts.endTime = endTime || this.opts.endTime;

    this.opts.countDown = this.opts.endTime.getTime() - this.opts.startTime.getTime();


    if(this.opts.down){
      const [h, m, s] = this.timeToDate(this.opts.countDown);
      this.clear();
      // this.renderTimeBg([h, m, s]);
      this.render();
    }

  }


  renderTimeBg([h, m, s]){
    this.renderBg();
    this.renderText([h, m, s]);
    this.renderTimeToCircle(this.degreeToRadian(6 * s), this.secRadius);
    this.renderTimeToCircle(this.degreeToRadian(6 * m), this.minRadius);
    this.renderTimeToCircle(this.degreeToRadian(6 * h), this.hourRadius);
    this.ctx.draw();
  }
}
