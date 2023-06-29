import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "open-ziti-console";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient, private settings: SettingsService, private router:Router) {
    }

    async login(prefix: string, url: string, username: string, password: string, rejectUnauthorized: boolean) {
        const serviceUrl = url + prefix;
        return firstValueFrom(this.httpClient.post(serviceUrl + "/authenticate?method=password", {
                username,
                password,
                rejectUnauthorized
            }, {
                headers: {
                    "content-type": "application/json",
                }
            })
                .pipe(
                    catchError((err: any) => {
                        const error = "Server Not Accessible";
                        if (err.code != "ECONNREFUSED") throw({error: err.code});
                        throw({error: error});
                    })
                )
        ).then((body: any) => {
            if (body.error) throw body.error;
            this.settings.user = body.data?.token;
            this.settings.authorization = 100;
            this.settings.controllerBaseUrl = url;
            this.settings.edgeSessionToken = body.data.token;
            this.settings.settingsChange.next(this.settings);
            this.router.navigate(['/']);
        });
    }
}
