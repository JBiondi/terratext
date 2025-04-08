
export function isIOSDevice(): boolean {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const isIOS = /iphone|ipad|ipod|mac/.test(userAgent) && "ontouchend" in document;

  const isIOSBrowser =
    /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("mac") && "ontouchend" in document);

  const hasIOSTouch = "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1;

  const isNonSafariOnIOS =
    (userAgent.includes("crios") || userAgent.includes("firefox/") || userAgent.includes("brave")) &&
    /iphone|ipad|ipod/.test(userAgent);

  return isIOS || isIOSBrowser || (hasIOSTouch && isIOSBrowser) || isNonSafariOnIOS;
}
