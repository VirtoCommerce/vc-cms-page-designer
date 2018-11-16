import { BaseControlDescriptor, OptionModel } from '.';

export interface SelectControlDescriptor extends BaseControlDescriptor {
    options: OptionModel[];
}
