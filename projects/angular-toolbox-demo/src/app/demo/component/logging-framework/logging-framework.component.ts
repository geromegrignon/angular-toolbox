/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { HtmlLogConnector, LogConnector, LoggerService, IdentifiableComponent } from 'projects/angular-toolbox/src/public-api';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';


@Component({
  selector: 'app-logging-framework-demo',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './logging-framework.component.html',
  styleUrl: 'logging-framework.component.scss'
})
export class LoggingFrameworkComponent extends IdentifiableComponent implements AfterViewInit, OnDestroy {

  @ViewChild("consoleViewport")
  private _console!: ElementRef<HTMLDivElement>;

  constructor(breadcrumb: BreadcrumbService,
              private _loggingService: LoggerService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Logging Framework"));
  }

  protected logIndex: number = 0;

  protected sendLog(type: string): void {
    if (type === "log") return this._loggingService.log(this.getClassRef(), "Log message - log #" + ++this.logIndex);
    if (type === "warn") return this._loggingService.warn(this.getClassRef(), "Warning message - log #" + ++this.logIndex);
    this._loggingService.error(this.getClassRef(), "Error message - log #" + ++this.logIndex);
  }

  protected documentation: DocumentationLink = {
    label: "Logging Framework",
    commands: ['/resources', 'documentation', 'logging-framework']
  };
  protected title: string = "Logging Framework Demo";
  protected presentation: string = "A lightweight, but prowerfull and flexible framework, that .....";
  protected srcCode: CodeWrapper = {
    html: [`<div #consoleViewport class="console-viewport"></div>
<section>
    <h6>Send log:</h6>
    <div class="btn-group">
        <button (click)="sendLog('log')">Log</button>
        <button (click)="sendLog('warn')">Warning</button>
        <button (click)="sendLog('error')">Error</button>
    </div>
</section>`]
    ,
    typescript: [`export class LoggingFrameworkDemoComponent implements AfterViewInit, OnDestroy {

  @ViewChild("consoleViewport")
  private console!: ElementRef<HTMLDivElement>;

  protected logIndex: number = 0;
    
  constructor(private logger: LoggerService) {}

  protected sendLog(type: string): void {
    if (type === "log") return this.logger.log(this.getClassRef(), "Log message - log #" + ++this.logIndex);
    if (type === "warn") return this.logger.warn(this.getClassRef(), "Warning message - log #" + ++this.logIndex);
    this.logger.error(this.getClassRef(), "Error message - log #" + ++this.logIndex);
  }

  public ngOnInit(): void {
    const connector: LogConnector = new HtmlLogConnector(this.console.nativeElement);
    this.logger.setLogConnector(connector);
  }

  public ngOnDestroy(): void {
    this.logger.setLogConnector(null);
  }
}`]
  };

  public ngAfterViewInit(): void {
    const logConnector: LogConnector = new HtmlLogConnector(this._console.nativeElement);
    this._loggingService.setLogConnector(logConnector);
  }

  public ngOnDestroy(): void {
    this._loggingService.setLogConnector(null);
  }
}
