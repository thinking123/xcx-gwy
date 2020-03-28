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

export class Tasks {
  queue = [];
  pending = false;
  timer = null;
  curTime = new Date().getTime;
  time = 1000;
  constructor() {}

  run() {
    if (Object.keys(this.queue).length > 0) {
      Object.keys(this.queue).forEach(k => {
        const { fun, key, ctx, period, lastRun } = this.queue[k];
        if (!lastRun || period <= (new Date().getTime - lastRun) / 1000) {
          fun.call(ctx);
          this.queue[k].lastRun = new Date().getTime;
        }
      });
      this.timer = setTimeout(this.run.bind(this), 1000);
    } else {
      this.timer = null;
    }
  }

  push(fun, key, period = 0, ctx = null) {
    if (!this.queue[key]) {
      this.queue[key] = {
        fun: function() {
          fun.bind(ctx);
        },
        key,
        ctx,
        period
      };

      if (!this.timer) {
        this.timer = setTimeout(this.run, 1000);
      }
    }
  }

  pop(key) {
    if (key) {
      delete this.queue[key];
    } else {
      this.queue = Object.create(null);
    }
  }
}

export const tasks = new Tasks();
