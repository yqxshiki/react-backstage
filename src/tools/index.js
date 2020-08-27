export const localSet = (key, value) => {
  localStorage.setItem(key, value);
};

export const localGet = (key) => {
  localStorage.getItem(key);
};

export const localRemove = (key) => {
  localStorage.removeItem(key);
};
