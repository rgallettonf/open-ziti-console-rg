import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

import {HttpClient} from "@angular/common/http";

// @ts-ignore
const {service, growler, context, page} = window;
const DEFAULTS = {
    "edgeControllers": [],
    "editable": true,
    "update": false,
    "location": "../ziti",
    "port": 1408,
    "portTLS": 8443,
    "rejectUnauthorized": false,
    "mail": {
        "host": "",
        "port": 25,
        "secure": false,
        "auth": {
            "user": "",
            "pass": ""
        }
    },
    "from": "",
    "to": ""
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    name = "settings";
    settings: any = {};
    versionData: any = {};
    settingsChange = new BehaviorSubject<any>({})
    rejectUnauthorized = false;
    port = DEFAULTS.port;
    portTLS = DEFAULTS.portTLS;
    apiVersions: any = {};
    user = '';
    authorization = -1;

    constructor(private httpClient: HttpClient) {

    }

    init() {
        this.events();
        this.get();
        this.version();

        if (this.settings.port && !isNaN(this.settings.port)) this.port = this.settings.port;
        if (this.settings.portTLS && !isNaN(this.settings.portTLS)) this.portTLS = this.settings.portTLS;
        if (this.settings.rejectUnauthorized && !isNaN(this.settings.rejectUnauthorized)) this.rejectUnauthorized = this.settings.rejectUnauthorized;
    }

    events() {

    }

    get() {
        const tmp = localStorage.getItem('ziti.settings');
        if (tmp) {
            this.settings = JSON.parse(tmp);
        } else {
            this.settings = {...DEFAULTS};
        }
        context.set(this.name, this.settings);
        this.settingsChange.next(this.settings ?? {})
    }

    set(data: any) {
        localStorage.setItem('ziti.settings', data);
        context.set(this.name, this.settings);
        this.settingsChange.next(this.settings ?? {});
    }

    version() {
        this.versionData = localStorage.getItem('ziti.version');
        context.set("version", this.versionData);
        this.settings = {...this.settings, version: this.versionData};
        this.settingsChange.next(this.settings)
    }

    delete(url: string) {
        service.call("server", {url: url}, this.deleted, "DELETE");
    }

    deleted(e: any) {
        if (page != null && page.deleting != null && page.deleting == this.versionData.baseUrl) {
            window.location.href = "/login";
        }
    }

    addContoller(name: string, url: string) {
        if (name.trim().length == 0 || url.trim().length == 0) {
            growler.error("Name and URL required");
        } else {
            this.controllerSave(name, url);
        }
    }

    initVersions(url: string) {
        url = url.split('#').join('').split('?').join('');
        if (url.endsWith('/')) url = url.substr(0, url.length - 1);
        if(!url.startsWith('https://')) url = 'https://' + url;
        const callUrl = url + "/edge/management/v1/version?rejectUnauthorized=" + this.rejectUnauthorized;
        firstValueFrom(this.httpClient.get(callUrl).pipe(catchError((err: any) => {
            throw "Edge Controller not Online: " + err?.message;
        }))).then((body: any) => {
            try {
                if (body.error) {
                    growler.error("Invalid Edge Controller: " + body.error);
                } else {
                    this.apiVersions = body.data.apiVersions;
                }
            } catch (e) {
                growler.error("Invalid Edge Controller: " + body);
            }
        }).catch(err => {
            growler.error(err);
        });
    }

    private controllerSave(name: string, url: string) {
        url = url.split('#').join('').split('?').join('');
        if (url.endsWith('/')) url = url.substr(0, url.length - 1);
        if(!url.startsWith('https://')) url = 'https://' + url;
        const callUrl = url + "/edge/management/v1/version?rejectUnauthorized=" + this.rejectUnauthorized;
        firstValueFrom(this.httpClient.get(callUrl).pipe(catchError((err: any) => {
            throw "Edge Controller not Online: " + err?.message;
        }))).then((body: any) => {
            try {
                if (body.error) {
                    growler.error("Invalid Edge Controller: " + body.error);
                } else {
                    if (body.data.apiVersions.edge.v1 != null) {
                        let found = false;
                        for (let i = 0; i < this.settings.edgeControllers.length; i++) {
                            if (this.settings.edgeControllers[i].url == url) {
                                found = true;
                                this.settings.edgeControllers[i].name = name;
                                this.settings.edgeControllers[i].url = url;
                                break;
                            }
                        }
                        if (!found) {
                            let isDefault = false;
                            if (this.settings.edgeControllers.length == 0) isDefault = true;
                            this.settings.edgeControllers[this.settings.edgeControllers.length] = {
                                name: name,
                                url: url,
                                default: isDefault
                            };
                        }
                        this.set(this.settings);

                    } else {
                        growler.error("Invalid Edge Controller: " + JSON.stringify(body));
                    }
                }
            } catch (e) {
                growler.error("Invalid Edge Controller: " + body);
            }
        }).catch(err => {
            growler.error(err);
        });
    }
}
