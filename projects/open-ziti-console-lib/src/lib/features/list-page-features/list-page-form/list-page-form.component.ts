import {
    AfterViewInit,
    Component,
    ComponentRef, ContentChild,
    EventEmitter, HostListener,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ExtendableComponent} from "../../extendable/extendable.component";

type CallbackResults = {passed: boolean, errors: { name: string, msg:string }[]}
type ValidatorCallback = (data: any) => Promise<CallbackResults>;

@Component({
    selector: 'lib-list-page-form',
    template: `
        <div *ngIf="_show" class="fullModal" [ngClass]="formClass">
            <div class="buttonBall close icon-close" (click)="closeThisForm()">
                <div class="buttonLabel">ESC</div>
            </div>
            <div class="innerblock">
                <ng-container #beforetitleext></ng-container>
                <div class="title">{{title}}</div>
                <ng-container #aftertitleext></ng-container>
                <ng-container #beforesubtitleext></ng-container>
                <div class="subtitle">{{subTitle}}</div>
                <ng-container #aftersubtitleext></ng-container>
                <ng-content></ng-content>
                <ng-container #beforebuttonsext></ng-container>
                <div class="buttons">
                    <div class="linkButton closer">Oops, No get me out of here</div>
                    <div id="SaveButton" class="button">Save</div>
                </div>
                <ng-container #afterbuttonsext></ng-container>
            </div>
        </div>
    `,
    styleUrls: ['./list-page-form.component.scss']
})
export class ListPageFormComponent extends ExtendableComponent implements AfterViewInit {

    @ContentChild("projectable", {read: ComponentRef, static: true}) public itemForm!: ComponentRef<any>;
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closeThisForm();
    }

    @Input() title = 'Form Title';
    @Input() subTitle = 'Form Subtitle';
    @Input() buttonLabel = 'Create';
    @Input() set data(d:any) {
        if(this.itemForm)
            this.itemForm.setInput('formData', d);
    }
    @Input() formClass: any | undefined;
    @Input() validator: ValidatorCallback | undefined;
    @Output() close = new EventEmitter<void>();
    @Output() afterOpen = new EventEmitter<void>();
    @Output() update = new EventEmitter<any>();

    constructor() {
        super();
    }

    _show = false;

    @Input() set show(val: boolean) {
        if (val && !this._show) this.openThisForm();
    }
    @Output() showChange = new EventEmitter<boolean>()

    override ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    async closeThisForm() {
        this.close.emit();
        this._show = false;
        this.showChange.emit(false);
    }

    async openThisForm() {
        this._show = true;
        this.afterOpen.emit();
    }

    updateItem() {
        if(this.validator) {
            this.validator(this.itemForm.instance.formData)
                .then((results: CallbackResults) => {
                if (results.passed) this.updateAndClose();
                else this.itemForm.setInput('errors', results.errors);
            })
        } else this.updateAndClose();
    }

    updateAndClose() {
        this.update.emit(this.itemForm.instance.formData);
        this.closeThisForm();
    }
}
