import {Injectable} from '@angular/core';
import {ZitiDataService} from "../../../services/ziti-data.service";
import {Resolver} from "@stoplight/json-ref-resolver";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    private configTypes: any[] = [];

    constructor(private dataService: ZitiDataService) {
    }

    async getSchema(schemaType: string): Promise<any> {
        if (!schemaType) return Promise.resolve();
        for (let idx = 0; idx < this.configTypes.length; idx++) {
            if(this.configTypes[idx].name === schemaType)
                return this.configTypes[idx].schema;
        }
    }

    getConfigTypes() {
        return this.dataService.get('config-types', {})
        .then(async (body: any) => {
            if (body.error) throw body.error;
            const promises: Promise<any>[] = [];
            const resolver = new Resolver();
            body.data.map( (row: any) => {
                const schema = row.schema;
                promises.push(resolver.resolve(schema, {}).then(s => {
                    row.schema = s.result;
                    this.configTypes.push(row);
                }))
            });
            return Promise.all(promises).then(() => this.configTypes);
        });
    }
}
