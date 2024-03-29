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
    username = '';
    password = '';
    edgeName: string = '';
    edgeUrl: string = '';
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
            const apiVersions = this.settingsService.apiVersions;
            const prefix = apiVersions["edge-management"].v1.path;
            this.svc.login(
                prefix,
                this.selectedEdgeController,
                this.username.trim(),
                this.password
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
        if (this.selectedEdgeController) {
            this.edgeName = ''
            this.edgeUrl = ''
            this.edgeCreate = false;
            this.userLogin = true;
            this.settingsService.initApiVersions(this.selectedEdgeController)
        } else {
            this.edgeCreate = true;
            this.userLogin = false;
        }
    }

    settingsReturned(settings: any) {
        this.edgeControllerList = [];
        this.selectedEdgeController = settings.selectedEdgeController;
        if (settings.edgeControllers?.length > 0) {
            this.backToLogin = false;
            this.edgeControllerList = settings.edgeControllers;
            this.reset();
        } else {
            this.backToLogin = true;
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
