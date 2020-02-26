// export default class DebugConsole {
//   open = false;
//   oldConsole = null;
//   constructor(open) {
//     this.open = open;
//     if (this.open) {
//       this.oldConsole = this.console;
//       this.console = {
//         log: function() {},
//         error: function() {}
//       };
//     }
//   }
// }

let oldConsole = null;
let newConsole = {};
const open = DEV;
function noop() {}
function debugConsole(open) {
  if (open) {
    oldConsole = console;
    Object.getOwnPropertyNames(console).forEach(k => {
      if (typeof console[k] === 'function') {
        newConsole[k] = noop;
      }
    });
    console = newConsole;

    oldConsole.log(`debug : ${open ? 'closed' : 'opened'}`);
  } else {
    console.log(`debug : ${open ? 'closed' : 'opened'}`);
  }
}

debugConsole(open);
