import { BaseControlDescriptor } from '.';

export interface NumberControlDescriptor extends BaseControlDescriptor {
    min?: number;
    max?: number;
}
