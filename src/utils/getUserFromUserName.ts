export function getUserFromUserName() {
  const userName = localStorage.getItem("userName");
  if (!userName) return null;

  return userName.split(" ")[0];
}
