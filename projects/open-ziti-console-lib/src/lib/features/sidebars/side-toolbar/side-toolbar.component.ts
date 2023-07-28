import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'lib-side-toolbar',
  templateUrl: './side-toolbar.component.html',
  styleUrls: ['./side-toolbar.component.scss']
})
export class SideToolbarComponent {
  hideNav:boolean | undefined;
  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.init();
    this.settingsService.settingsChange.subscribe((results:any) => {
      this.hideNav = results.hideNav;
    });
  }
  toggleNav() {
    this.hideNav = !this.hideNav;
    const settings = {
      ...this.settingsService.settings, hideNav: this.hideNav
    }
    this.settingsService.set(settings);
  }
}
