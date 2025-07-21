export const saveAuthData = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("lastActivity", Date.now());
};

export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");

export const isSessionValid = () => {
  const lastActivity = localStorage.getItem("lastActivity");
  if (!lastActivity) return false;
  const now = Date.now();
  return now - lastActivity < 3600000; // 1 hour
};
