import 'source-map-support/register'
import { getTokenFromAuthorizationHeader } from '../utils';

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteToDo} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("Processing Delete Todo Event ", event);

    const token = getTokenFromAuthorizationHeader(event.headers.Authorization);
    const todoId = event.pathParameters.todoId;
    const deleteResult = await deleteToDo(todoId, token);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true
        },
        body: deleteResult,
    }
};
