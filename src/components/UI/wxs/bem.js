import array from './array'
import object from './object'
var PREFIX = 'c-';

function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function(mod) {
    return name + '--' + mod;
  });
  mods.unshift(name);

  console.log('mods join : ' , mods)
  return mods.join(' ');
}

function traversing(mods, conf) {
  if (!conf) {
    return;
  }

  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (array.isArray(conf)) {
    conf.forEach(function(item) {
      traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    object.keys(conf).forEach(function(key) {
      console.log('key:' , key)
      conf[key] && mods.push(key);
    });
  }

  console.log('mods' , mods)
}

export function bem(name, conf) {
  var mods = [];
  traversing(mods, conf);
  return join(name, mods);
}

// module.exports.bem = bem;
