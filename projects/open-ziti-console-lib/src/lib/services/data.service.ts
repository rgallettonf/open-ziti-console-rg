import { Injectable } from '@angular/core';
import {LoggerService} from "../features/messaging/logger.service";
import {GrowlerService} from "../features/messaging/growler.service";
import {SettingsService} from "./settings.service";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private logger: LoggerService,
              private growler: GrowlerService,
              private settingsService: SettingsService,
              private httpClient: HttpClient) {

  }

  get(type: string, paging: any) {
    const apiVersions = this.settingsService.apiVersions;
    const prefix = apiVersions["edge-management"].v1.path;
    const url = this.settingsService.settings.selectedEdgeController;
    const urlFilter = this.getUrlFilter(paging);
    const serviceUrl = url + prefix + "/" + type + urlFilter;

    return firstValueFrom(this.httpClient.get(serviceUrl,
        {})
        .pipe(
            catchError((err: any) => {
              const error = "Server Not Accessible";
              if (err.code != "ECONNREFUSED") throw({error: err.code});
              throw({error: error});
            })
        )
    );
  }

  private getUrlFilter(paging: any) {
    let urlFilter = '';
    let toSearchOn = "name";
    let noSearch = false;
    if (paging && paging.sort != null) {
      if (paging.searchOn) toSearchOn = paging.searchOn;
      if (paging.noSearch) noSearch = true;
      if (!paging.filter) paging.filter = "";
      paging.filter = paging.filter.split('#').join('');
      if (noSearch) {
        if (paging.page !== -1) urlFilter = "?limit=" + paging.total + "&offset=" + ((paging.page - 1) * paging.total);
      } else {
        if (paging.page !== -1) urlFilter = "?filter=(" + toSearchOn + " contains \"" + paging.filter + "\")&limit=" + paging.total + "&offset=" + ((paging.page - 1) * paging.total) + "&sort=" + paging.sort + " " + paging.order;
        if (paging.params) {
          for (const key in paging.params) {
            urlFilter += ((urlFilter.length === 0) ? "?" : "&") + key + "=" + paging.params[key];
          }
        }
      }
    }
    return urlFilter;
  }

}
