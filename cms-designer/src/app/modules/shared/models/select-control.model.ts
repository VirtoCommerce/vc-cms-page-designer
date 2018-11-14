import { BaseControlModel, OptionModel } from '.';

export interface SelectControlModel extends BaseControlModel {
    options: OptionModel[];
}
