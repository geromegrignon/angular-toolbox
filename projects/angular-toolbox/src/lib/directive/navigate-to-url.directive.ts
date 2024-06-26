/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { LINK_ROLE } from '../util';

@Directive({
  selector: '[navigateToUrl]',
  standalone: true
})
export class NavigateToUrlDirective {

  @Input()
  public href!: string;
  
  /**
   * @private
   */
  @HostListener('click')
  private onClick(): void {
    const HREF: string | undefined = this.href;
    if (!HREF) throw new ReferenceError("href attribute is not defined.");
    this._document.defaultView.location.href = HREF;
  }

  /**
   * @private
   */
  constructor(@Inject(DOCUMENT) private _document: any,
              private _elmRef: ElementRef) {
    const elm: HTMLElement = this._elmRef.nativeElement;
    elm.role = LINK_ROLE;
    elm.tabIndex = 0;
  }
}
