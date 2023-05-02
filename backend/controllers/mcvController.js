import { getProfileInformation,getAllAssignments } from "../services/mycourseVileCourseService.js";
import { getAssignments } from "../services/priorityService.js";

export const getProfileHandler = (req, res) => {
    getProfileInformation(req.session.token.access_token).then((profile) => {
        res.status(200).send(profile)
    }).catch((err) => {
    res.status(401).send(err)})
}

export const getAllAssignmentsHandler = async (req, res) => {
    const profile = await getProfileInformation(req.session.token.access_token);
    const assignmentList = await getAllAssignments(req.session.token.access_token)
    const priorityList = await getAssignments(profile.account.uid)
    assignmentList.map((assignment) => {
        assignment.priority = priorityList.find((priority) => priority.assignment_id === assignment.assignment_id)?.priority ?? 4
    })
    res.status(200).send(assignmentList)
}
  