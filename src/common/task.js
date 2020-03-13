class Task {
  //   queue = Object.create(null);
  queue = [];
  pending = false;
  timer = null;
  curTime = new Date().getTime;
  constructor() {
    this.timer = setTimeout(this.task, 1000);
  }

  task() {}

  push(fun, ctx, delay = 0) {
    this.queue.push(() => {
      fun.bind(ctx);
    });

    if (!pending) {
      this.pending = true;
      Promise.resolve().then(this.flushTask);
    }
  }

  flushTask() {
    this.pending = false;
    const tasks = this.queue.slice(0);
    this.queue.length = 0;
    tasks.forEach(task => task());
  }

  //   push(fun, ctx) {
  //     this.queue.push(() => {
  //       fun.bind(ctx);
  //     });

  //     if (!pending) {
  //       this.pending = true;
  //       Promise.resolve().then(this.flushTask);
  //     }
  //   }

  //   flushTask() {
  //     this.pending = false;
  //     const tasks = this.queue.slice(0);
  //     this.queue.length = 0;
  //     tasks.forEach(task => task());
  //   }
}

export class TaskTimer {
  queue = [];
  pending = false;
  timer = null;
  curTime = new Date().getTime;
  time = 1000;
  constructor() {}

  task() {
    if (this.queue.length > 0) {
      const diff = (new Date().getTime - this.curTime) / 1000;
      this.queue.forEach(({ fun, ctx, delay }) => {
        if (diff >= delay) {
          fun.bind(ctx);
        }
      });
      this.timer = setTimeout(this.task, 1000);
    } else {
      this.timer = null;
    }

    this.curTime = new Date().getTime;
  }

  push(fun, ctx, delay = 0) {
    this.queue.push(() => {
      fun.bind(ctx);
    });

    if (!this.timer) {
      this.timer = setTimeout(this.task, 1000);
    }
  }

  pop(fun) {
    let len = this.queue.length;
    while (--len >= 0) {
      if (this.queue[len].fun === fun) {
        this.queue.splice(len, 1);
        break;
      }
    }
    if (this.queue.length == 0) {
      this.timer = null;
    }
  }

  stop() {}
}
