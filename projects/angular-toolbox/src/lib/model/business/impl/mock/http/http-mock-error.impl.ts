/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpMockError } from "../../../mock/http";

/**
 * @private
 * The default implementation of the `HttpMockError` interface.
 */
export class HttpMockErrorImpl implements HttpMockError {

    /**
     * Specifies the error status code.
     */
    public readonly status: HttpStatusCode;

    /**
     * Specifies the body of the error.
     */
    public readonly body: any;

    /**
     * Specifies the error status text.
     */
    public readonly statusText: string;

    /**
     * @private
     */
    constructor(status: HttpStatusCode, statusText: string, body: any) {
        if (status < HttpStatusCode.BadRequest) throw new RangeError("Error status must be equal to, or greater than 400.")
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
};