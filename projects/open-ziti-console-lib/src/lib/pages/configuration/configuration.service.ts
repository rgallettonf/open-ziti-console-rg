import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private httpClient: HttpClient) {
    }

    getSchema(configName: string): Promise<any> {
        return firstValueFrom(this.httpClient.get(`/assets/schemas/${configName}.schema.json`)
            .pipe(catchError((err: any) => {
                throw "Edge Controller not Online: " + err?.message;
            })))
            .then((results: any) => {
                return this.parseSchema(results);
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
