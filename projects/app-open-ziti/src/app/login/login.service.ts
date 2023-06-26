import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "open-ziti-console";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient, private settings: SettingsService) {
    }

    async login(prefix: string, url: string, username: string, password: string, rejectUnauthorized: boolean) {
        const serviceUrl = url + prefix;
        const creds = {
            username: username,
            password: password
        };
        await this.authenticate(serviceUrl, creds, rejectUnauthorized);
    }

    async authenticate(serviceUrl: string, creds: any, rejectUnauthorized: boolean) {
        return firstValueFrom(this.httpClient.post(serviceUrl + "/authenticate?method=password", {
                json: creds,
                rejectUnauthorized: rejectUnauthorized
            })
                .pipe(
                    catchError((err: any) => {
                        const error = "Server Not Accessible";
                        if (err.code != "ECONNREFUSED") throw({error: err.code});
                        throw({error: error});
                    })
                )
        ).then((body: any) => {
            if(body.error) throw body.error;
            this.settings.user = body.data?.token;
            this.settings.authorization = 100;
        });
    }
}
