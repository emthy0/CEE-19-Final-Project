// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/auth/auth_app`;
};


const logout = async () => {
  window.location.href = `http://${backendIPAddress}/auth/logout`;
};
console.log("Auth loaded")