import {Component, EventEmitter, Input, Output} from '@angular/core';
import {debounce} from "lodash";

@Component({
  selector: 'lib-list-page-filter',
  templateUrl: './list-page-filter.component.html',
  styleUrls: ['./list-page-filter.component.scss']
})
export class ListPageFilterComponent {
    @Input() start: number = 0;
    @Input() end: number = 0;
    @Input() total: number = 0;
    @Input() searchTerms = '';

    @Output() searchTermsChanged = new EventEmitter<string>();
    @Output() previous = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();

    onKeyup() {
        debounce(() => {
            this.submitFilter()
        }, 500)();
    }

    submitFilter() {
        this.searchTermsChanged.emit(this.searchTerms);
    }

    previousClicked() {

        if(this.start !== 1)
        this.previous.emit();
    }

    nextClicked() {
        if(this.end !== this.total)
        this.next.emit();
    }
}
