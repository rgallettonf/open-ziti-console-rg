import {Component, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {ExtendableComponent} from "../../features/extendable/extendable.component";
import {ConfigurationService} from "./configuration.service";
import {SchemaService} from "../../services/schema.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'lib-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends ExtendableComponent implements OnDestroy {
    @ViewChild("dynamicform", {read: ViewContainerRef}) dynamicForm!: ViewContainerRef;

    options: string[] = [
        "host.v1",
        "host.v2",
        "intercept.v1",
        "ziti-tunneler-client.v1",
        "ziti-tunneler-server.v1",
    ];

    lColorArray = [
        '#ffffff',
        '#ffffff',
        '#ffffff',
    ]

    bColorArray = [
        '#33aaff',
        '#fafafa',
        '#33aaff',
    ]

    config: string = '';
    editMode = false;
    showCode = false;
    items: any = [];
    formData: any = {};
    subscription = new Subscription()

    constructor(private svc: ConfigurationService,
                private schemaSvc: SchemaService) {
        super();
    }

    async createForm() {
        this.clear();
        if (this.config && this.dynamicForm) {
            const currentSchema = await this.svc.getSchema(this.config);
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
                    const pName = cRef.instance.parentName;
                    if (pName && !this.formData[pName]) this.formData[pName] = {};
                    this.subscription.add(
                        cRef.instance.valueChange.subscribe((val: any) => {
                            const pName = cRef.instance.parentName;
                            const fName = cRef.instance.fieldName;
                            if (pName && !this.formData[pName]) this.formData[pName][fName];
                            else this.formData[fName] = val;
                        }));
                }
            }
        }
    }
}
