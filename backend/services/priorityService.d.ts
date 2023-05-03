import { Assignment } from "./mycourseVileCourseService";
export enum AssignmentPriority {
    DEFAULT = 0,
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3,
    DONE = 4
}

export interface AssignmentPriorityDoc {
    assignment_id: number;
    priority: AssignmentPriority;
}

export declare function setAssignments(user_id: string, assignments: Assignment[]): Promise<any>
export declare function getAssignments(user_id: string): Promise<AssignmentPriorityDoc[]>
export declare function deleteAssignments(user_id: string): Promise<any>