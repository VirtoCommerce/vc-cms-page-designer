import { ControlDescriptor } from '.';

export interface BlockSchema {
    name: string;
    icon: string;
    type?: string;
    static?: string;
    displayField?: string;
    settings: ControlDescriptor[];
}

export interface BlocksSchema {
    [key: string]: BlockSchema;
}
