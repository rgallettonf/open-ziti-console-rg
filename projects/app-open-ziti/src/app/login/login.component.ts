import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {SettingsService} from "open-ziti-console-lib";
import {Subscription} from "rxjs";

// @ts-ignore
const {growler, context} = window;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    edgeControllerList: any[] = [];
    username = 'ZTUSER8F2697013DCF296909FE3127EA1056D73A10D660';
    password = 'ZTPASS11581A57398E75D18DB3C4556577210965332DEC';
    edgeName: string = 'v8ManualTest';
    edgeUrl: string = 'https://132.145.128.130';
    edgeCreate = false;
    userLogin = false;
    selectedEdgeController = '';
    edgeNameError = '';
    edgeUrlError = '';
    backToLogin = false;
    showEdge = false;
    private subscription = new Subscription();

    constructor(private svc: LoginService, private settingsService: SettingsService) { }

    ngOnInit() {
        this.subscription.add(
        this.settingsService.settingsChange.subscribe((results: any) => {
            if (results) this.settingsReturned(results);
        }));
        this.edgeChanged();
    }

    async login() {
        if(this.selectedEdgeController) {
            context.set("serviceUrl", this.selectedEdgeController);
            await this.settingsService.initVersions(this.selectedEdgeController);
            const prefix = this.settingsService.apiVersions["edge-management"].v1.path;
            this.svc.login(
                prefix,
                this.selectedEdgeController,
                this.username.trim(),
                this.password,
                this.settingsService.rejectUnauthorized
            );
        }
    }

    create() {
        if (this.isValid()) {
            this.settingsService.addContoller(this.edgeName, this.edgeUrl);
            context.set("serviceUrl", this.edgeUrl);
            this.settingsService.set(this.settingsService.settings);
        } else growler.form();
    }

    isValid() {
        this.edgeNameError = '';
        this.edgeUrlError = '';
        if (this.edgeName.trim().length == 0) this.edgeNameError = '';
        if (this.edgeUrl.trim().length == 0) this.edgeUrlError = '';
        return!(this.edgeNameError || this.edgeUrlError);
    }

    reset() {
        this.edgeNameError = '';
        this.edgeUrlError = '';
        this.edgeCreate = false;
        this.userLogin = true;
    }

    edgeChanged() {
        this.edgeNameError = '';
        this.edgeUrlError = '';
        if (this.selectedEdgeController?.length === 0) {
            this.edgeName = ''
            this.edgeUrl = ''
            this.edgeCreate = true;
            this.userLogin = false;
        } else {
            this.edgeCreate = false;
            this.userLogin = true;
            this.settingsService.initVersions(this.selectedEdgeController)
        }
    }

    settingsReturned(settings: any) {
        this.edgeControllerList = [];
        this.selectedEdgeController = '';
        if (settings.edgeControllers?.length > 0) {
            this.backToLogin = true;
            this.reset();
            this.edgeControllerList = settings.edgeControllers;
            this.showEdge = (settings.editable || settings.editable == null);
        } else {
            this.backToLogin = false;
            this.edgeCreate = true;
            this.userLogin = false;
        }
        const lastUrl = context.get("serviceUrl");
        if (lastUrl && lastUrl.trim().length > 0) this.selectedEdgeController = lastUrl.trim();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
