import { BaseDescriptor } from '.';

export interface DisplayTextControlDescriptor extends BaseDescriptor {
    type: 'header' | 'paragraph';
    content: string;
}
