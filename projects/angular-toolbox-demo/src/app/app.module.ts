/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { AppBrigeService, DARK_MODE_CONFIG, VERSION_CONFIG, httpMockFactory } from 'angular-toolbox';
import { XhrFactory } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: false, storageKey: "angular-toolbox-dark-mode" } },
    //--> Angular Toolbox lib version
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 7, patch: 0, buildTimestamp: 1719486823542 } },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appBrigeService: AppBrigeService) {}
}
