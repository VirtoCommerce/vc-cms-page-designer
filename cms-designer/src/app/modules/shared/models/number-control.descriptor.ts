import { BaseControlDescriptor } from '.';

export interface NumberControlDescriptor extends BaseControlDescriptor {
    type: 'number';
    min?: number;
    max?: number;
}
