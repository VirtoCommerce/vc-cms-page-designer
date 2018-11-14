import { ControlModel } from '.';

export interface BlockModel {
    name: string;
    icon: string;
    type?: string;
    displayField?: string;
    settings: ControlModel[];
}

