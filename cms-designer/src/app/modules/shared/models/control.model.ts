import {
    BaseModel,
    BaseControlModel,
    CheckboxControlModel,
    ImageControlModel,
    ColorControlModel,
    NumberControlModel,
    SelectControlModel,
    StringControlModel,
    TextControlModel,
    CollectionControlModel,
    DisplayTextControl
} from '.';


export type ControlModel = BaseModel
    | BaseControlModel
    | CheckboxControlModel
    | CollectionControlModel
    | ColorControlModel
    | DisplayTextControl
    | ImageControlModel
    | NumberControlModel
    | SelectControlModel
    | StringControlModel
    | TextControlModel;

// {
//     type: string;
//     id?: string;
//     content?: string;
//     label?: string;
//     info?: string;
//     options?: { label: string; value: string; group?: string }[];
// }
