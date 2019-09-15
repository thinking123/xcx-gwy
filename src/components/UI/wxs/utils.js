import {memoize} from 'UI/wxs/memoize';
import {bem} from 'UI/wxs/bem';


export default {
  bem: memoize(bem),
  memoize: memoize
}
// module.exports = {
//   bem: memoize(bem),
//   memoize: memoize
// };
