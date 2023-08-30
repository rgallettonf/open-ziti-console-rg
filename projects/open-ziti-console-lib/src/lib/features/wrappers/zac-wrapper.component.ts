import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ZAC_WRAPPER_SERVICE, ZacWrapperService} from "./zac-wrapper.service";
import {delay, invoke, isEmpty} from 'lodash';
import {Subscription} from "rxjs";
import {SettingsService} from "../../services/settings.service";

@Component({
    selector: 'app-zac-wrapper',
    templateUrl: './zac-wrapper.component.html',
    styleUrls: ['./zac-wrapper.component.scss'],
})
export class ZacWrapperComponent implements OnInit, OnDestroy {

  pageHtml: any = '';
  subscription = new Subscription();
  title = 'Ziti Console';
  waitingForSession = true;
  @ViewChild('zacContainer') zacContainer: any;

  constructor(
      @Inject(ZAC_WRAPPER_SERVICE) private wrapperService: ZacWrapperService,
      private settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    this.wrapperService.initZac();
    this.subscription.add(
    this.wrapperService.pageChange.subscribe(() => {
      if (this.waitingForSession) {
        return;
      }
      this.loadPage();
    }));
    this.settingsService.settingsChange.subscribe((results:any) => {
        if (!isEmpty(this.settingsService?.settings?.session?.id)) {
          if (this.waitingForSession) {
              this.waitingForSession = false;
              delay(() => {
                this.loadPage();
              }, 200)
          }
        }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pageHtml = undefined;
  }

  async loadPage() {
    this.pageHtml = await this.wrapperService.loadCurrentPage();
    this.executePageScripts();
  }

  executePageScripts() {
    setTimeout(() => {
      const scripts = this.zacContainer.nativeElement.getElementsByTagName('script');
      for (const script of scripts) {
        const scriptCopy = <HTMLScriptElement>document.createElement('script');
        scriptCopy.type = script.type ? script.type : 'text/javascript';
        if (script.innerHTML) {
          scriptCopy.innerHTML = script.innerHTML;
        } else if (script.src) {
          scriptCopy.src = script.src;
        }
        scriptCopy.async = false;
        script.parentNode.replaceChild(scriptCopy, script);
      }
      setTimeout(() => {
        invoke(window, 'app.init');

      }, 30);
    });
  }
}
