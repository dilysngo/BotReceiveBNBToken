const storage = window.sessionStorage

const hasSessionStorage = () => {
  try {
    return 'sessionStorage' in window && window.sessionStorage !== null
  } catch (e) {
    return false
  }
}

export const MINI_TTL = 60 * 1 * 1000 // One minutes
export const SHORT_TTL = 60 * 5 * 1000 // Five minutes
export const MEDIUM_TTL = 60 * 20 * 1000 // Twenty minutes
export const LONG_TTL = 60 * 60 * 1000 // One Hour
export const DAY_TTL = 60 * 60 * 24 * 1000 // One Day

/**
 * @Create
 */
export const createStorage = (key, data) => {
  if (hasSessionStorage() === false) {
    return;
  }
  storage.setItem(key, data)
}
export const createStorageBase64 = (key, data) => {
  createStorage(key, Buffer.from(data).toString('base64'))
}
export const createStorageJSON = (key, data) => {
  createStorage(key, JSON.stringify(data))
}
export const createStorageJSONTTL = (key, data, ttl) => {
  const now = new Date()

  const item = {
    content: data,
    expire: now.getTime() + ttl,
  }

  createStorage(key, JSON.stringify(item))
}

/**
 * @Get
 */
export const getFromStorage = (key) => {
  if (hasSessionStorage === false) {
    return ''
  }

  return storage.getItem(key)
}
export const getFromStorageBase64 = (key) => {
  const data = getFromStorage(key)

  return data !== null ? Buffer.from(data, 'base64').toString('ascii') : null
}
export const getFromStorageJSON = (key) => {
  const data = getFromStorage(key)

  return data !== null ? JSON.parse(data) : null
}
export const getFromStorageJSONTTL = (key) => {
  const now = new Date()
  let data = getFromStorage(key)

  if (data === null) {
    return null
  }

  data = JSON.parse(data)

  if (now.getTime() > data.expire) {
    localStorage.removeItem(key)

    return null
  }

  return data.content
}

/**
 * @Remove
 */
export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
}
