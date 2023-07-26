import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'lib-side-navbar',
    templateUrl: './side-navbar.component.html',
    styleUrls: ['./side-navbar.component.scss'],
    animations: [
        trigger('insertRemoveTrigger', [
            transition(':enter', [
                style({opacity: 0}),
                animate('100ms', style({opacity: 1})),
            ]),
            transition(':leave', [
                animate('100ms', style({opacity: 0}))
            ])
        ]),
    ]
})
export class SideNavbarComponent {
    @Input() version = '';
}
