import { BaseModel } from '.';

export interface BaseControlModel extends BaseModel {
    label?: string;
    info?: string; // question: may info be html? now it can be markdown
    default?: string | boolean | number | Date;
}
