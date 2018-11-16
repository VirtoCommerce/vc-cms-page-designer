import { BaseControlDescriptor, OptionModel } from '.';

export interface SelectControlDescriptor extends BaseControlDescriptor {
    type: 'select';
    options: OptionModel[];
}
