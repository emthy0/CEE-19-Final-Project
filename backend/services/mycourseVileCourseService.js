import axios from "axios";

const getCourseVileData = (url, access_token) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((res) => {
      if (res.data) return res.data;
      throw new Error("Failed to fetch data");
    });
};

export const getProfileInformation = (access_token) => {
  return getCourseVileData(
    "https://www.mycourseville.com/api/v1/public/get/user/info",
    access_token
  ).then((res) => res.data);
};

export const getCourseList = (access_token) => {
  return getCourseVileData(
    "https://www.mycourseville.com/api/v1/public/get/user/courses",
    access_token
  ).then((res) =>{
    if (res.data) {
        return res.data.student
    }
    throw new Error("Failed to fetch data");
  });
};

export const getCourseAssignments = (access_token, cv_cid) => {
  return getCourseVileData(
    `https://www.mycourseville.com/api/v1/public/get/course/assignments?cv_cid=${cv_cid}&detail=1`,
    access_token
  ).then((res) =>{
    if (res.data) {
        return res.data
    }
    throw new Error("Failed to fetch data");
  });
};


export const getAllAssignments = async (access_token) => {
    const promList = await getCourseList(access_token).then((courseList) => {
      return courseList.map((course) => {
        return new Promise((resolve, reject) => {
          getCourseAssignments(access_token, course.cv_cid)
            .then((assignments) => {
              
              const modAss = assignments.map((assignment) => {
                return {course, ...assignment}
              })
              resolve(modAss);
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    });
    return Promise.all(promList).then(res=> res.flat()).catch((err) => []);
  };
  