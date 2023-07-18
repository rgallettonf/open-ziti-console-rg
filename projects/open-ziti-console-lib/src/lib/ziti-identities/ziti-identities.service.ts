import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ZITI_DOMAIN_CONTROLLER, ZitiDomainControllerService} from "../services/ziti-domain-controller.service";

@Injectable({
    providedIn: 'root'
})
export class ZitiIdentitiesService {

    private paging: any = {
        filter: "",
        noSearch: false,
        order: "ASC",
        page: 1,
        searchOn: "id",
        sort: "id",
        total: 100
    }

    zitiControllerDomain = '';
    zitiSessionId = '';
    constructor(
        private http: HttpClient,
        @Inject(ZITI_DOMAIN_CONTROLLER) private zitiDomainController: ZitiDomainControllerService
    ) {
        this.zitiDomainController.zitiSettings.subscribe(results => {
            this.zitiControllerDomain  = results.zitiDomain;
            this.zitiSessionId = results.zitiSessionId;
        })
    }

    public getZitiIdentities() {
        return this.getZitiEntities('identities', this.paging);
    }

    getZitiEntities(type: string, paging: any) {
        const serviceUrl = `${this.zitiControllerDomain}/edge/management/v1`;
        let urlFilter = "";
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
        return this.callZitiEdge(serviceUrl + "/" + type + urlFilter, {});
    }

    callZitiEdge(url: string, body: any, method: string = 'GET') {
        const options = this.getHttpOptions();
        let prom;
        switch (method) {
            case 'GET':
                prom = this.http.get(url, options).toPromise();
                break;
            case 'POST':
                prom = this.http.post(url, body, options).toPromise();
                break;
            case 'PUT':
                prom = this.http.put(url, body, options).toPromise();
                break;
            case 'PATCH':
                prom = this.http.patch(url, body, options).toPromise();
                break;
            case 'DELETE':
                prom = this.http.delete(url, options).toPromise();
                break;
            default:
                prom = this.http.get(url, options).toPromise();
                break;
        }
        return prom.catch((result) => {
            return result?.error;
        });
    }

    getHttpOptions(useZitiCreds = false) {
        const options: any = {
            headers: {
                accept: 'application/json',
                'zt-session': this.zitiSessionId
            },
            params: {},
            responseType: 'json' as const,
        };
        return options;
    }
}