import { Assignment } from "./mycourseVileCourseService";
export enum AssignmentPriority {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3,
    DEFAULT = 4
}

export interface AssignmentPriorityDoc {
    assignment_id: string;
    priority: AssignmentPriority;
}

export declare function setAssignments(user_id: string, assignments: Assignment[]): Promise<any>
export declare function getAssignments(user_id: string): Promise<AssignmentPriorityDoc[]>
export declare function deleteAssignments(user_id: string): Promise<any>