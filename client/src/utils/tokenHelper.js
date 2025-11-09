export const setToken = (token) => {
  if (typeof token === 'string' && token.trim()) {
    localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  return localStorage.getItem('token') || null;
};

export const removeToken = () => {
  localStorage.removeItem('token');
};