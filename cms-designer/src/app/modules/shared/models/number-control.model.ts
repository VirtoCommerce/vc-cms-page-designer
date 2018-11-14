import { BaseControlModel } from '.';

export interface NumberControlModel extends BaseControlModel {
    min?: number;
    max?: number;
}
