import {ExtendableComponent} from "../extendable/extendable.component";
import {Component} from "@angular/core";

@Component({
    template: ` `
})
export abstract class ProjectableForm extends ExtendableComponent {
    abstract formData: any;
    abstract errors: { name: string, msg: string }[];
    abstract clear(): void;
}
