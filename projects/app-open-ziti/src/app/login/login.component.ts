import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {SettingsService} from "open-ziti-console";

// @ts-ignore
const {growler, context, user} = window;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    edgeControllerList: any[] = [];
    username = '';
    password = '';
    edgeName: string = '';
    edgeUrl: string = '';
    edgeCreate = false;
    userLogin = false;
    selectedEdgeController = '';
    edgeNameError = false;
    edgeUrlError = false;
    backToLogin = false;
    showEdge = false;

    constructor(private svc: LoginService, private settings: SettingsService) { }

    ngOnInit() {
        this.settings.settingsChange.subscribe((results: any) => {
            if (results) this.settingsReturned(results);
        });
        this.edgeChanged();
    }

    login() {
        context.set("serviceUrl", this.selectedEdgeController);
        const prefix = this.settings.apiVersions["edge-management"].v1.path;
        this.svc.login(
            prefix,
            this.selectedEdgeController,
            this.username.trim(),
            this.password,
            this.settings.rejectUnauthorized
        );
    }

    create() {
        if (this.isValid()) {
            this.settings.addContoller(this.edgeName, this.edgeUrl);
            context.set("serviceUrl", this.edgeUrl);
        } else growler.form();
    }

    isValid() {
        this.edgeNameError = false;
        this.edgeUrlError = false;
        if (this.edgeName.trim().length == 0) this.edgeNameError = true;
        if (this.edgeUrl.trim().length == 0) this.edgeUrlError = true;
        return!(this.edgeNameError || this.edgeUrlError);
    }

    reset() {
        this.edgeNameError = false;
        this.edgeUrlError = false;
        this.edgeCreate = false;
        this.userLogin = true;
    }

    edgeChanged() {
        this.edgeNameError = false;
        this.edgeUrlError = false;
        if (this.selectedEdgeController?.length === 0) {
            this.edgeName = ''
            this.edgeUrl = ''
            this.edgeCreate = true;
            this.userLogin = false;
        } else {
            this.edgeCreate = false;
            this.userLogin = true;
            this.settings.initVersions(this.edgeUrl)
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
        var lastUrl = context.get("serviceUrl");
        if (lastUrl && lastUrl.trim().length > 0) this.selectedEdgeController = lastUrl.trim();
    }
}
