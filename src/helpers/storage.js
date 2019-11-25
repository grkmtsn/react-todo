const { parse } = JSON;
const { stringify } = JSON;

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

const storage = {
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }
    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },
  clearAppStorage() {
    if (localStorage) localStorage.clear();
    if (sessionStorage) sessionStorage.clear();
  },
  get(key) {
    if (localStorage && localStorage.getItem(key)) return parse(localStorage.getItem(key)) || null;
    if (sessionStorage && sessionStorage.getItem(key))
      return parse(sessionStorage.getItem(key)) || null;

    return null;
  },
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) return null;
    if (isLocalStorage && localStorage) return localStorage.setItem(key, stringify(value));
    if (sessionStorage) return sessionStorage.setItem(key, stringify(value));

    return null;
  },
};

export { storage };
