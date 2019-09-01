export function getImgUrl(url) {
  console.log('image url: ' , url)
  return url;
}

export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
