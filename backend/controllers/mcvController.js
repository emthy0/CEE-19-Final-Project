import { getProfileInformation,getAllAssignments } from "../services/mycourseVileCourseService.js";
import { getAssignments, setAssignments } from "../services/priorityService.js";

export const getProfileHandler = (req, res) => {
    getProfileInformation(req.session.token.access_token).then((profile) => {
        console.log(profile)
        res.status(200).send(profile)
    }).catch((err) => {
    res.status(401).send(err)})
}

export const getAllAssignmentsHandler = async (req, res) => {
    const profile = await getProfileInformation(req.session.token.access_token);
    const assignmentList = await getAllAssignments(req.session.token.access_token)
    const priorityList = await getAssignments(profile.account.uid)
    if (!assignmentList || !priorityList) return res.status(200).send([])
    assignmentList.map((assignment) => {
        
        assignment.priority = priorityList.find((priority) => priority.assignment_id === assignment.itemid)?.priority ?? 0
        return assignment
    })
    return res.status(200).send(assignmentList)
}
  

export const setAllAssignmentsHandler = async (req, res) => {
    const profile = await getProfileInformation(req.session.token.access_token);
    const assignments = req.body
    if (!assignments) return res.status(400).send("No assignments provided")
    await setAssignments(profile.account.uid, assignments)
    res.status(200).send("Successfully updated assignments")
}