import crypto from 'crypto';

export function createCookieDict(cookieString) {
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

export const encryptedCookie = {
  encrypt: function(token, key) {
    let cipher = crypto.createCipher('aes256', key);
    let encrypted = cipher.update(token, 'utf8', 'base64') + cipher.final('base64');

    return encrypted;
  },
  decrypt: function(token, key) {
    let decipher = crypto.createDecipher('aes256', key);
    let decrypted = decipher.update(token, 'base64', 'utf8') + decipher.final('utf8');

    return decrypted;
  },
  setExpiration: function(days) {
    let date = new Date();
    let expirationDate = new Date(date.setDate(date.getDate() + days));

    return expirationDate;
  }
}
