import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']})
export class SideNavbarComponent {
  @Input() version = '';
}
