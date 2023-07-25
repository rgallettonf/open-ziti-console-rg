import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "open-ziti-console";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import moment from "moment";
import {debounce, delay, isEmpty} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private domain = '';

    constructor(private httpClient: HttpClient, private settingsService: SettingsService, private router: Router) {
    }

    async login(prefix: string, url: string, username: string, password: string, rejectUnauthorized: boolean) {
        this.domain = url;
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
            const settings = {
                ...this.settingsService.settings, session: {
                    id: body.data?.token,
                    controllerDomain: this.domain,
                    authorization: 100,
                    expiresAt: body.data.expiresAt
                }
            }
            this.settingsService.set(settings);
            const tokenExpirationDate = moment(settings.session.expiresAt);
            const expTime = tokenExpirationDate.diff(moment());
            let buffer = expTime - (1000 * 30);
            if (buffer < 10000) {
                buffer = 10000;
            }
            delay(() => {
                this.loginDebounced(prefix, url, username, password, rejectUnauthorized);
            }, buffer);
            this.router.navigate(['/']);
        });
    }
    loginDebounced = debounce(this.login.bind(this), 10000, {leading: true});
}
