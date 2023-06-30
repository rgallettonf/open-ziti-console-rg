import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SettingsService} from "open-ziti-console";
// @ts-ignore
const {growler} = window;

export const authenticationGuard: CanActivateFn = (route, state) => {
  const settingsSvc = inject(SettingsService);
  const isAuthorized = !!settingsSvc.settings.sessionId;
  if (!isAuthorized) {
    // growler.error('not authorized');
    inject(Router).navigate(['/login']);
  }

  return isAuthorized;
};
