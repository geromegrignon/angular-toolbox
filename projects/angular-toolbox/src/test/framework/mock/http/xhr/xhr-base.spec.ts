/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { TestBed } from '@angular/core/testing';
import { XhrBase } from '../../../../../lib/framework/mock/http/xhr/xhr-base';

describe('XhrBase', () => {
  let baseClassInstance: XhrBase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    baseClassInstance = new XhrBase();
  });

  it('should be created', () => {
    expect(baseClassInstance).toBeTruthy();
  });

  it('should "UNSENT" equal to 0', () => {
    expect(baseClassInstance.UNSENT).toEqual(0);
  });
  
  it('should "OPENED" equal to 1', () => {
    expect(baseClassInstance.OPENED).toEqual(1);
  });
  
  it('should "HEADERS_RECEIVED" equal to 2', () => {
    expect(baseClassInstance.HEADERS_RECEIVED).toEqual(2);
  });

  it('should "LOADING" equal to 3', () => {
    expect(baseClassInstance.LOADING).toEqual(3);
  });

  it('should "DONE" equal to 4', () => {
    expect(baseClassInstance.DONE).toEqual(4);
  });
});
