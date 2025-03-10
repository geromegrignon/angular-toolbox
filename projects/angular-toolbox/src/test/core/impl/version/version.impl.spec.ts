/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Version } from '../../../../lib/model/business/version/version';
import { VersionImpl } from '../../../../lib/core/impl/version/version.impl';

describe('VersionImpl', () => {

  const MAJOR: number = 2;
  const MINOR: number = 5;
  const PATCH: number = 32;
  const METADATA: string = "pre-release";
  const BUILD_TS: number = Date.now();

  let version: VersionImpl;

  beforeEach(() => {
    version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TS, METADATA);
  });

  it('should create an instance', () => {
    expect(version).toBeTruthy();
  });
  
  it('major should return the major version number', () => {
    expect(version.major).toBe(MAJOR);
  });

  it('minor should return the minor version number', () => {
    expect(version.minor).toBe(MINOR);
  });

  it('patch should return the patch version number', () => {
    expect(version.patch).toBe(PATCH);
  });

  it('buildTimeStamp should return the correct timestamp number', () => {
    expect(version.buildTimeStamp).toBe(BUILD_TS);
  });

  it('metadata should return the correct metadata string', () => {
    expect(version.metadata).toBe(METADATA);
  });

  it('metadata should be undefined by default', () => {
    const v: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TS);
    expect(v.metadata).toBeUndefined();
  });

  it('toString() should return string representation of the version in the form "M.m.p-metadata"', () => {
    expect(version.toString()).toBe(`${MAJOR}.${MINOR}.${PATCH}-${METADATA}`);
  });

  it('toString() should return string representation of the version in the form "M.m.p when no metadata are provided"', () => {
    const v: Version = new VersionImpl(MAJOR, MINOR, PATCH, BUILD_TS);
    expect(v.toString()).toBe(`${MAJOR}.${MINOR}.${PATCH}`);
  });
});
