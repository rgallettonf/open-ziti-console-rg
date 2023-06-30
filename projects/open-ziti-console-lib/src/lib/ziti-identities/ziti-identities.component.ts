import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {ZacWrapperService} from "../zac-wrapper.service";
import {SettingsService} from "../services/settings.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'lib-ziti-identities',
  templateUrl: './ziti-identities.component.html',
  styleUrls: ['./ziti-identities.component.scss']
})
export class ZitiIdentitiesComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type.name', headerName: 'Type' },
    { field: 'isAdmin' },
    { field: 'createdAt' },
    { field: 'token' },
    { field: 'mfa', headerName: 'Type' }
  ];

  rowData = [];

  constructor(private wrapperService: ZacWrapperService, private settings: SettingsService, private http: HttpClient) {}

  ngOnInit() {
    const serviceUrl = `${this.settings.controllerBaseUrl}/edge/management/v1/identities`;
    const options = this.getHttpOptions();
    this.http.get(serviceUrl, options).toPromise().then((data: any) => {
      this.rowData = data.data;
    });
  }

  getHttpOptions(useZitiCreds = false) {
    const options: any = {
      headers: {
        accept: 'application/json',
        'zt-session': this.settings.edgeSessionToken
      },
      params: {},
      responseType: 'json' as const,
    };
    return options;
  }
}
