/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from "angular-toolbox";
import { DataStorage } from "./data-storage";
import { validateUser } from "./validate-user";
import { TodoDto } from "../model/business/dto/todo.dto";
import { UpdateTodoDto } from "../model/business/dto/update-todo.dto";

const DATA_STORAGE: DataStorage = new DataStorage();

const NOT_FOUND_ERROR: HttpMockError = {
    status: HttpStatusCode.NotFound,
    statusText: "Not Found"
};

const BAD_REQUEST_ERROR: HttpMockError = {
    status: HttpStatusCode.BadRequest,
    statusText: "Bad Request"
};

export const TODOS_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "todoCollection",
            endpoints: [
                {
                    route: "/todos/:userId",
                    get: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.getTodoCollection(userId) )
                                                                         .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    },
                    delete: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.deteteTodoCollection(userId) )
                                                                         .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    }
                }
            ]
        },
        {
            id: "todo",
            endpoints: [
                {
                    route: "/todos/:userId/todo",
                    post: {
                        data: (req: HttpRequest<string>, params: any)=> {
                            const responseMock = httpResponseMock();
                            if ( req.body === null) return responseMock.response(BAD_REQUEST_ERROR);
                            const userId: number = parseInt(params.userId);
                            const dto: TodoDto = DATA_STORAGE.addTodo(userId, req.body);
                            return responseMock.body( dto )
                                               .status(HttpStatusCode.Created)
                                               .statusText("Created")
                                               .response();
                        }
                    }
                },
                {
                    route: "/todos/:userId/todo/:id",
                    put: {
                        data: (req: HttpRequest<UpdateTodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            if ( req.body === null) return responseMock.response(BAD_REQUEST_ERROR);
                            const id: number = parseInt(params.id);
                            const userId: number = parseInt(params.userId);
                            const dto: UpdateTodoDto = JSON.parse(req.body as any);
                            const result: boolean = DATA_STORAGE.updateTodo(userId, id, dto.title, dto.completed);
                            if (result) return responseMock.body( null )
                                                           .status(HttpStatusCode.NoContent)
                                                           .statusText("No Content")
                                                           .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    }
                }
            ]
        }
    ]
};