import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {SettingsService} from "../../../services/settings.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private httpClient: HttpClient,
                private settingsService: SettingsService) {
    }

    async getSchema(schemaType: string): Promise<any> {
        if (!schemaType) return Promise.resolve();
        const apiVersions = this.settingsService.apiVersions;
        const prefix = apiVersions["edge-management"].v1.path;
        const url = this.settingsService.settings.selectedEdgeController;
        const serviceUrl = url + prefix + "/api/schema";
        return firstValueFrom(this.httpClient.post(serviceUrl,
            {schema: schemaType}, {
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
            return this.parseSchema(body.schema);
        });
    }

    parseSchema(results: any): any {
        return {
            $id: results.$id,
            type: results.type,
            properties: results.properties
        };
    }
}
