export const windowSize = () => {
  let winWidth = 0;
  let winHeight = 0;
  //获取窗口宽度
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth;
  }

  //获取窗口高度
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight;
  }

  //通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
  }
  let obj = {
    w: winWidth,
    h: winHeight
  };
  return obj;
};
export const setAdaptive = () => {
  let _baseFontSize = 10;
  let windowsWidth = windowSize().w;
  let _fontscale = windowsWidth / 375;
  let ua = navigator.userAgent;
  let matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  let UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  let isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = parseInt((window.devicePixelRatio || 1), 10);
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  let scale = 1 / dpr;
  let metaEl = document.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    document.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  document.documentElement.style.fontSize = (_baseFontSize / 2 * dpr * _fontscale) + 'px';
  document.documentElement.setAttribute('data-dpr', dpr);
};
