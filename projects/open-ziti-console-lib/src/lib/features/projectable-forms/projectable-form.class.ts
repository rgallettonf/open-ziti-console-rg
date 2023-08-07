import {ExtendableComponent} from "../extendable/extendable.component";

export abstract class ProjectableForm extends ExtendableComponent {
    abstract formData: any;
    abstract errors: { name: string, msg: string }[];
    abstract clear(): void;
}
