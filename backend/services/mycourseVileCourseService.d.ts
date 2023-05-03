import { AssignmentPriority } from "./priorityService"

export interface Student {
    id: string
    title_th: string
    firstname_th: string
    lastname_th: string
    title_en: string
    firstname_en: string
    lastname_en: string
    degree: string
  }
  
  export interface Account {
    uid: string
    profile_pict: string
  }
  

export type ProfileInformation = {
    student: Student
    account: Account
}

export interface McvCourse {
    cv_cid: number
    course_no: string
    year: string
    semester: number
    section: string
    role: string
    title: string
    course_icon: string
}

export interface McvAssignment {
    itemid: number
    title: string
    type: string
    status: number
    created: number
    changed: number
    instruction: string
    outdate: string
    duedate: string
    duetime: number
}

export interface Assignment extends McvCourse {
    course: McvCourse
    priority: AssignmentPriority
}

export declare function getProfileInformation(access_token: string): Promise<ProfileInformation>
export declare function getCourseList(access_token: string): Promise<McvCourse[]>
export declare function getCourseAssignments(access_token: string, cv_cid: string): Promise<McvAssignment[]>
export declare function getAllAssignments(access_token: string): Promise<Assignment[]>