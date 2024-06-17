import { Component } from '@angular/core';
import { VersionService } from 'angular-toolbox';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';

@Component({
  selector: 'app-version-service',
  templateUrl: './version-service.component.html'
})
export class VersionServiceComponent {

  constructor(public versionService: VersionService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Version Service"));
  }

  public title: string = "Version Service Demo";
  public presentation: string = "A lightweight service that provides  Semantic Versionning implementation for your Angular projects.";
  public srcCode: CodeWrapper = {
    html: `<p>Current Angular Toolbox Version: {{ versionService.getVersion().toString() }}</p>
<p>Build Release Date: {{ versionService.getBuidTimestamp() | date }}</p>`,
    ts: `/////////////////////////
// Application Module
/////////////////////////

@NgModule({
  declarations: [],
  providers: [
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 0 } }
  ],
  exports: []
})
export class AppModule { }


/////////////////////////
// Component class
/////////////////////////

export class VersionServiceComponent {
    constructor(public versionService: VersionService) {}
}`
  };
}
