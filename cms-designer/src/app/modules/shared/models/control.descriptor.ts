import {
    BaseDescriptor,
    BaseControlDescriptor,
    CheckboxControlDescriptor,
    ImageControlDescriptor,
    ColorControlDescriptor,
    NumberControlDescriptor,
    SelectControlDescriptor,
    StringControlDescriptor,
    TextControlDescriptor,
    CollectionControlDescriptor,
    DisplayTextControlDescriptor
} from '.';


export type ControlDescriptor = BaseDescriptor
    | BaseControlDescriptor
    | CheckboxControlDescriptor
    | CollectionControlDescriptor
    | ColorControlDescriptor
    | DisplayTextControlDescriptor
    | ImageControlDescriptor
    | NumberControlDescriptor
    | SelectControlDescriptor
    | StringControlDescriptor
    | TextControlDescriptor;

// {
//     type: string;
//     id?: string;
//     content?: string;
//     label?: string;
//     info?: string;
//     options?: { label: string; value: string; group?: string }[];
// }
