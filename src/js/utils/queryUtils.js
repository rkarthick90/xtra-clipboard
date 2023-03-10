function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
function decode(qs, sep = '&', eq = '=', options) {
  const obj = {}

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj
  }

  const regexp = /\+/g
  const querystring = qs.split(sep)

  let maxKeys = 1000
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys
  }

  let len = querystring.length
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys
  }

  for (let i = 0; i < len; ++i) {
    const x = querystring[i].replace(regexp, '%20')
    const idx = x.indexOf(eq)
    let kstr
    let vstr
    let k
    let v

    if (idx >= 0) {
      kstr = x.substr(0, idx)
      vstr = x.substr(idx + 1)
    } else {
      kstr = x
      vstr = ''
    }

    k = decodeURIComponent(kstr)
    v = decodeURIComponent(vstr)
    if (!hasOwnProperty(obj, k)) {
      obj[k] = v
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v)
    } else {
      obj[k] = [obj[k], v]
    }
  }

  return obj
}

function useQueryInterface(obj) {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage(obj, function(response) {
      resolve(response)
    })
  })
}

export {decode, useQueryInterface}
