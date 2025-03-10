/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpMockError, Uuid } from 'projects/angular-toolbox/src/public-api';
import { ItemDto, Token, UpdateItemDto } from "./http-mock-business";

export const NOT_FOUND_ERROR: HttpMockError = {
    status: HttpStatusCode.NotFound,
    statusText: "Not Found"
};

export const UNAUTHORIZED_ERROR: HttpMockError = {
    status: HttpStatusCode.Unauthorized,
    statusText: "Unauthorized"
};

export const TOKEN: Token = {
    id: Uuid.build().toString()
};

export const CREATED_ITEM_DTO: ItemDto = {
    id: Uuid.build().toString()
};

export const DELETED_ITEM_DTO: ItemDto = {
    id: CREATED_ITEM_DTO.id
};

export const EMPTY_ITEM_DTO: UpdateItemDto = {
    id: Uuid.build().toString(),
    data: null
};

export const UPDATE_ITEM_DTO: UpdateItemDto = {
    id: Uuid.build().toString(),
    data: {
        foo: "bar"
    }
};

// from https://codeblogmoney.com/json-example-with-data-types-including-json-array/

export const COMPLEX_JSON: any = {
    "actors": [
        {
            "name": "Tom Cruise",
            "age": 56,
            "bornPlace": "Syracuse, NY",
            "birthdate": "July 3, 1962",
            "photo": "https://jsonformatter.org/img/tom-cruise.jpg",
            "wife": null,
            "weight": 67.5,
            "hasChildren": true,
            "hasGreyHair": false,
            "children": [
                "Suri",
                "Isabella Jane",
                "Connor"
            ]
        },
        {
            "name": "Robert Downey Jr.",
            "age": 53,
            "bornPlace": "New York City, NY",
            "birthdate": "April 4, 1965",
            "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",
            "wife": "Susan Downey",
            "weight": 77.1,
            "hasChildren": true,
            "hasGreyHair": false,
            "children": [
                "Indio Falconer",
                "Avri Roel",
                "Exton Elias"
            ]
        }
    ]
};

export const EMAIL_SAMPLE: string = "ryo.saeba@city-hunter.com";
export const VALID_PASSWORD: string = "xyz";

export const TEXT_DATA: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const PHP_ERROR: string = `<html><head></head><body><br>
<font size="1"><table class="xdebug-error xe-parse-error" dir="ltr" border="1" cellspacing="0" cellpadding="1">
<tbody><tr><th align="left" bgcolor="#f57900" colspan="5"><span style="background-color: #cc0000; color: #fce94f; font-size: x-large;">( ! )</span> Parse error: syntax error, unexpected token "=" in C:\\wamp64\\www\\angular-toolbox\\foo\\bar\\index.php on line <i>13</i></th></tr>
</tbody></table></font>
</body></html>`;

export const  getPngBlobData = (): Blob => {
    const imgData: string = atob("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");
    const byteArrays: number[] = [];
    const size: number = imgData.length;
    let i: number = 0;
    for (; i < size; ++i) byteArrays.push(imgData.charCodeAt(i));
    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: 'image/png' });
};

export const  getArrayBufferData = (): ArrayBuffer => {
    const stringData: string = 'Hello World!';
    return new ArrayBuffer(stringData.length*2);
};
