/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogLevel } from "../../../../../../model";
import { AtxHttpLogMetadataDto } from "./atx-http-log-metadata.dto";

export interface AtxHttpLogDto {
    
    /**
     * The criticality level of this log dto.
     */
    level: LogLevel;

    /**
     * The timestamp at which the original log has been created.
     */
    timestamp: number;

    /**
     * Metada associated with the original log.
     */
    metadata: AtxHttpLogMetadataDto;
}