import { BaseControlDescriptor } from '.';

export interface StringControlDescriptor extends BaseControlDescriptor {
    type: 'string';
    placeholder?: string;
}
