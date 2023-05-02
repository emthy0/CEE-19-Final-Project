import { axios } from "./xhr-wrapper.js"

const backendIPAddress = "127.0.0.1:3000";

// TODO #3.1: Change group number

export const getGroupNumber = () => {
  return 99;
};

// Example: Send Get user profile ("GET") request to backend server and show the response on the webpage
export async function getUserProfile () {
  const options = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`http://${backendIPAddress}/mcv/profile`, options)
    .then((response) => response.json())
};

// TODO #3.3: Send Get Courses ("GET") request to backend server and filter the response to get Comp Eng Ess CV_cid
//            and display the result on the webpage
export const getCompEngEssCid = async () => {
  document.getElementById("ces-cid-value").innerHTML = "";
  console.log(
    "This function should fetch 'get courses' route from backend server and find cv_cid value of Comp Eng Ess."
  );
};

// TODO #3.5: Send Get Course Assignments ("GET") request with cv_cid to backend server
//            and create Comp Eng Ess assignments table based on the response (itemid, title)
export const createCompEngEssAssignmentTable = async () => {
  const table_body = document.getElementById("main-table-body");
  table_body.innerHTML = "";
  const cv_cid = document.getElementById("ces-cid-value").innerHTML;

  console.log(
    "This function should fetch 'get course assignments' route from backend server and show assignments in the table."
  );
};

export const getCourseAssignments = async () => {
  return axios.get(`http://${backendIPAddress}/mcv/assignments`,).then((res) => {
    console.log(res.json());
    return res.json();
  });}
