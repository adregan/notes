export default function createCookieDict(cookieString) {
  let cookie = {
    options: {}
  }
  let items = cookieString.split(';').map(part => part.trim().split('='))
  items.forEach((item, i) => {
    if (i === 0) {
      cookie.name = item[0];
      cookie.value = item[1];
    }
    else if (item.length === 2) {
      if (item[0].toLowerCase() === 'expires') {
        cookie.options[item[0].toLowerCase()] = new Date(item[1]);
      }
      else {
        cookie.options[item[0].toLowerCase()] = item[1];
      }
    }
    else {
      cookie.options[item[0].toLowerCase()] = true;
    }
  })

  return cookie;
}