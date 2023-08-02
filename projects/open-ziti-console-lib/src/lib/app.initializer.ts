import {Injector} from "@angular/core";
import {SettingsService} from "./services/settings.service";

export function onAppInit(injector: Injector): () => Promise<any> {
    const svc = injector.get(SettingsService);
    return () => svc.init();
}
