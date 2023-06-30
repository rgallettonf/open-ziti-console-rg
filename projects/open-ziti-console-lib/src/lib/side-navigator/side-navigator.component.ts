import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {OPEN_ZITI_NAVIGATOR} from "./side-navigator.service";

@Component({
    selector: 'app-side-navigator',
    templateUrl: './side-navigator.component.html',
    styleUrls: ['./side-navigator.component.scss'],
})
export class SideNavigatorComponent implements OnInit, OnDestroy {

    currentNav: any = OPEN_ZITI_NAVIGATOR;
    open = true;
    isOpened = false;
    url = '';

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url.split('?')[0];
            }
        });
    }

    toggleList(event: any) {
        event.stopPropagation();
        this.isOpened = !this.isOpened;
    }

    ngOnDestroy(): void {
    }

}
