import {isObj} from '@/common/utils';


const getClassNames = (name) => ({
  enter: `c-${name}-enter c-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `c-${name}-enter-to c-${name}-enter-active enter-to-class enter-active-class`,
  leave: `c-${name}-leave c-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `c-${name}-leave-to c-${name}-leave-active leave-to-class leave-active-class`
});

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

export const transition = function (showDefaultValue) {
  return {
    props: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        default: showDefaultValue,
        // observer: 'observeShow'
      },
      // @ts-ignore
      duration: {
        type: Number,
        default: 300,
        // observer: 'observeDuration'
      },
      name: {
        type: String,
        default: 'fade'
      }
    },

    data: {
      type: '',
      inited: false,
      display: false,
      classes:'',
      currentDuration:'',
      loaded:false
    },

    attached() {
      this.loaded = true;
      if (this.show) {
        this.enter();
      }
    },
    watch:{
      show(v){
        if(this.loaded){
          this.observeShow(v)
        }

      }
    },
    methods: {
      observeShow(value) {
        if (value) {
          this.enter();
        } else {
          this.leave();
        }
      },

      enter() {
        const { duration, name } = this;
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.enter : duration;

        this.status = 'enter';



        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus('enter');

            // this.$wx.setData({
            //   inited: true,
            //   display: true,
            //   classes: classNames.enter,
            //   currentDuration
            // });
            //
            //
            this.inited = true;
            this.display = true;
            // this.$set(this , 'classes' ,classNames.enter )
            this.classes = classNames.enter;
            this.currentDuration = currentDuration;

          })
          .then(nextTick)

      .then(() => {
        this.checkStatus('enter');

        // this.$wx.setData({
        //   classes: classNames['enter-to']
        // });
        this.classes = classNames['enter-to'];
          })
          .catch(() => {});
      },

      leave() {
        const { duration, name } = this;
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.leave : duration;

        this.status = 'leave';

        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus('leave');

            this.classes = classNames.leave;
            this.currentDuration = currentDuration;
            // this.$wx.setData({
            //   classes: classNames.leave,
            //   currentDuration
            // });
          })
          .then(() => setTimeout(() => this.onTransitionEnd(), currentDuration))
          .then(nextTick)
          .then(() => {
            this.checkStatus('leave');

            this.classes = classNames['leave-to'];
            // this.$wx.setData({
            //   classes: classNames['leave-to']
            // });
          })
          .catch(() => {});
      },

      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },

      onTransitionEnd() {
        if (!this.show) {
          this.display = false;
          // this.set({ display: false });
          this.$emit('transitionend');
        }
      }
    }
  }
};
