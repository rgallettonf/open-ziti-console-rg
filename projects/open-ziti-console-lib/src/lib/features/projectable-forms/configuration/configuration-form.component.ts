import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {Subscription} from "rxjs";
import {SchemaService} from "../../../services/schema.service";
import {ExtendableComponent} from "../../extendable/extendable.component";
import {ProjectableFormType} from "../projectableForm.type";

@Component({
    selector: 'lib-configuration',
    templateUrl: './configuration-form.component.html',
    styleUrls: ['./configuration-form.component.scss']
})
export class ConfigurationFormComponent extends ExtendableComponent implements OnInit, ProjectableFormType, OnDestroy {
    @ViewChild("dynamicform", {read: ViewContainerRef}) dynamicForm!: ViewContainerRef;
    @Input() formData: any = {};
    @Input() errors: string[] = [];

    options: string[] = [];

    lColorArray = [
        'black',
        'white',
        'white',
    ]

    bColorArray = [
        '#33aaff',
        '#fafafa',
        '#33aaff',
    ]

    configType: string = '';
    configTypes = [];
    editMode = false;
    items: any = [];
    subscription = new Subscription()

    constructor(private svc: ConfigurationService,
                private schemaSvc: SchemaService) {
        super();
    }

    async createForm() {
        this.clear();
        if (this.configType && this.dynamicForm) {
            const currentSchema = await this.svc.getSchema(this.configType);
            if (currentSchema) {
                this.render(currentSchema);
            }
        }
    }

    ngOnDestroy(): void {
        this.clear();
    }

    clear() {
        this.items.forEach((item: any) => {
            if (item?.component) item.component.destroy();
        });
        this.items = [];
        this.formData = {};
        if (this.subscription) this.subscription.unsubscribe();
    }

    render(schema: any) {
        if (schema.properties) {
            this.items = this.schemaSvc.render(schema, this.dynamicForm, this.lColorArray, this.bColorArray);
            for (let obj of this.items) {
                const cRef = obj.component;
                if (cRef?.instance.valueChange) {
                    const pName = cRef.instance.parentage;
                    if (pName && !this.formData[pName]) this.formData[pName] = {};
                    this.subscription.add(
                        cRef.instance.valueChange.subscribe((val: any) => {
                            const pName = cRef.instance.parentage;
                            const fName = cRef.instance.fieldName;
                            if (pName && !this.formData[pName]) this.formData[pName][fName];
                            else this.formData[fName] = val;
                        }));
                }
            }
        }
    }

    ngOnInit(): void {
        this.svc.getConfigTypes()
            .then(recs => {
                this.options = recs.map(r => r.name).sort();
            })
    }
}
