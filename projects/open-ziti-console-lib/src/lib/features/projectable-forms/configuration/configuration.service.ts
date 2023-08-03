import {Injectable} from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {ZitiDataService} from "../../../services/ziti-data.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    private configTypes: any[] = [];

    constructor(private dataService: ZitiDataService,
                private settingsService: SettingsService) {
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
        .then((body: any) => {
            if (body.error) throw body.error;
            this.configTypes = body.data;
            return this.configTypes;
        });
    }
}
