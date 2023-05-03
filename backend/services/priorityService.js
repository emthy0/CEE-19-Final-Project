import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand  } from "@aws-sdk/lib-dynamodb"

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION })

export const setAssignments = async (user_id, assignments) => {
    // await deleteAssignments(user_id).catch(err => console.error(err))
    // console.log(assignments)
    const params = {
        TableName: process.env.assignmentPriorityTableName,
        Item: {
            user_id: user_id,
            assignments: assignments.map((assignment) => {
                return {
                    assignment_id: assignment.itemid,
                    priority: assignment.priority,
                }
            })
        },
    }
    console.log(params)
    const command = new PutCommand(params)
    return await docClient.send(command)
}

export const deleteAssignments = async (user_id) => {
    const params = {
      TableName: process.env.assignmentPriorityTableName,
      Key: { user_id },
    }
    return await docClient.send(new DeleteCommand(params))
}

export const getAssignments = async (user_id) => {
    const params = {
      TableName: process.env.assignmentPriorityTableName,
      Key: {
        user_id
       },
    }
    return await docClient.send(new GetCommand(params)).then(data => data.Item?.assignments ?? [])
}