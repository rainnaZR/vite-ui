function getStorageData(key) {
  const data = localStorage.getItem(key);
  return data && JSON.parse(data);
}

function setStorageData(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function deleteStorageData(key) {
  if (key) return localStorage.removeItem(key);
  return localStorage.clear();
}

export default {
  getStorageData,
  setStorageData,
  deleteStorageData,
};
