import { BaseControlDescriptor } from '.';

export interface TextControlDescriptor extends BaseControlDescriptor {
    type: 'text';
    placeholder?: string;
}
