export default function authHeader(raw = false) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    if (raw) {
      return "Bearer " + user.accessToken;
    } else {
      return { Authorization: "Bearer " + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    }
  } else {
    if (raw) return "";
    else return {};
  }
}
