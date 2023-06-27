import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SettingsService} from "open-ziti-console";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const settings = inject(SettingsService);
  const isAuthorized = !!settings.user;
  if (!isAuthorized) {
    inject(Router).navigate(['login']);
  }

  return isAuthorized;
};
