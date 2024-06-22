/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

/**
 * A basic implementation of HTML sanitization pipe.
 */
@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform  {

  /**
   * @private
   */
  constructor(private _sanitizer: DomSanitizer) {}

  /**
   * Transforms the HTML input string value into a `SafeHtml` instance and returns the result
   * of the transformation.
   * 
   * @param value The HTML input value to transform into a `SafeHtml` instance.
   * @returns A `SafeHtml` instance based on the specified input value.
   */
  public transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}