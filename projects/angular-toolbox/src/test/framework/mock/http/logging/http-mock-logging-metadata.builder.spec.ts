/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingService, HttpMockRequestMetadata } from 'projects/angular-toolbox/src/public-api';
import { TestBed } from '@angular/core/testing';
import { DESTROY_DELAY, ROUTE_CONFIG, URL } from '../xhr/util/delegate-xhr-test-util';
import { DelegateXhr } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/delegate-xhr';
import { HttpMockLoggingMetadataBuilder } from 'projects/angular-toolbox/src/lib/framework/mock/http/logging/http-mock-logging-metadata.builder';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HTTPMethodRef } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum';

describe('HttpMockLoggingMetadataBuilder', () => {

  const REQUEST: HttpRequest<any> = new HttpRequest("GET", "http://fake.url");

  let xhr: DelegateXhr;
  let logger: HttpMockLoggingService;
  let requestMetadata: HttpMockRequestMetadata;
  let timestamp: number;

  beforeEach(() => {
    timestamp= Date.now();
    TestBed.configureTestingModule({
        providers: [HttpMockLoggingService]
    });
    logger = TestBed.inject(HttpMockLoggingService);
    requestMetadata = {
      startTime: timestamp,
      endTime: timestamp + 1000
    }
  });

  it('should create a HttpMockLoggingMetadata object', () => {
    xhr = new DelegateXhr(ROUTE_CONFIG, logger);
    const metadata = HttpMockLoggingMetadataBuilder.build(xhr, REQUEST, requestMetadata);
    expect(metadata.request).not.toBeNull();
    expect(metadata.requestMetadata).not.toBeNull();
    expect(metadata.response).not.toBeNull();
  });

  it('should create a HttpMockLoggingMetadata object with the specified HttpRequest object', () => {
    xhr = new DelegateXhr(ROUTE_CONFIG, logger);
    const metadata = HttpMockLoggingMetadataBuilder.build(xhr, REQUEST, requestMetadata);
    expect(metadata.request).toBe(REQUEST);
  });

  it('should create a HttpMockLoggingMetadata object with the correct request metadata', () => {
    xhr = new DelegateXhr(ROUTE_CONFIG, logger);
    const metadata = HttpMockLoggingMetadataBuilder.build(xhr, REQUEST, requestMetadata);
    expect(metadata.requestMetadata).toBe(requestMetadata);
  });
  
  it('should create a HttpMockLoggingMetadata object with the expected HttpResponse object', (done) => {
    xhr = new DelegateXhr(ROUTE_CONFIG, logger);
    xhr.open(HTTPMethodRef.GET, URL);
    xhr.send();
    setTimeout(()=> {
      const metadata = HttpMockLoggingMetadataBuilder.build(xhr, REQUEST, requestMetadata);
      const response: HttpResponse<any> = metadata.response;
      expect(response.body).toBe(xhr.response);
      expect(response.status).toBe(xhr.status);
      expect(response.statusText).toBe(xhr.statusText);
      expect(response.url).toBe(URL);
      expect(response.type).toBe(xhr.readyState);
      expect(response.headers.toString()).toEqual(xhr.getAllResponseHeaders());
      setTimeout(done, DESTROY_DELAY);
  }, 100);
  });
});
