export default class Circle {

  keyRunTime = 'local-circle-timer-run-time';
  isPause = false;
  isStop = false;
  constructor(options) {
    const def = {
      bgColor: '#FFF',
      secColor: '#3291a8',
      minColor: '#3291a8',
      hourColor: '#3291a8',
      runColor: 'yellow',
      attached: 'body',
      drawColor: '#FFFFFF',
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
      down: false,
      secRadius:0,
      minRadius:0,
      hourRadius:0,
      ratio:1,
      step:false
    };

    this.opts = { ...def, ...options };
    const {secRadius , minRadius , hourRadius} = this.opts;

    let root = document.getElementById(this.opts.attached);
    if (!root) {
      root = document.body;
    }

    this.root = root;
    const { width, height } = root.getBoundingClientRect();
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

    const canvas = document.createElement('canvas');
    root.appendChild(canvas);
    canvas.id = this.getId();
    canvas.width = width;
    canvas.height = height;
    canvas.style.zIndex = 100;

    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
  }

  degreeToRadian(deg) {
    return (Math.PI / 180) * deg;
  }

  renderBg() {
    const { x, y } = this.center;
    const c = this.ctx;
    const deg360 = this.degreeToRadian(360);
    this.renderCircle(0, deg360, this.secRadius, this.opts.runColor);
    this.renderCircle(0, deg360, this.minRadius, this.opts.runColor);
    this.renderCircle(0, deg360, this.hourRadius, this.opts.hourColor);
  }

  renderCircle(start, end, r, strokeStyle, lineWidth = 2) {
    const { x, y } = this.center;
    const c = this.ctx;
    const offset = this.degreeToRadian(-90);
    c.beginPath();
    c.lineWidth = lineWidth;
    c.strokeStyle = strokeStyle;
    c.arc(x, y, r, offset + start, offset + end);
    c.stroke();
    c.closePath();
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
    this.ctx.fillText(strTime, this.center.x, this.center.y);
    this.ctx.textAlign = 'center';
    this.ctx.font = '48px serif';
    this.ctx.textBaseline = 'middle';
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


    if (s <= 1000) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.renderBg();
    this.renderText([h, m, s]);
    this.renderTimeToCircle(this.degreeToRadian(6 * s), this.secRadius);
    this.renderTimeToCircle(this.degreeToRadian(6 * m), this.minRadius);
    this.renderTimeToCircle(this.degreeToRadian(6 * h), this.hourRadius);

    if (this.opts.down) {
      if (diff > 0) {
        requestAnimationFrame(this.renderTime.bind(this));
      } else {
        this.end();
      }
    } else {
      if (diff < countDown) {
        requestAnimationFrame(this.renderTime.bind(this));
      } else {
        this.end();
      }
    }

  }

  end() {
    if (this.opts.down) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.renderBg();
    }

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
          this.opts.countDown -= diff;
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
    this.renderCircle(0, deg, r, this.opts.drawColor, 6);
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
}
