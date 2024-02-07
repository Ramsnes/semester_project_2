// localStorageUtil.js
export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage(key) {
  return localStorage.removeItem(key);
}
