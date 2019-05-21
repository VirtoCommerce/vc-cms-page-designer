import { BaseControlDescriptor, OptionModel } from '.';

export interface UrlControlDescriptor extends BaseControlDescriptor {
    styles?: OptionModel[];
    textLabel: string;
    flagLabel: string;
    styleLabel: string;
}
