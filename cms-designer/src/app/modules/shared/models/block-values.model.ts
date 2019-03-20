export class BlockValuesModel {
    id?: number;
    type: string;
    icon?: string;
    title?: string; // for page in settings
    name?: string; // for block in list
    hidden?: boolean;
    [key: string]: ValueType | ValueType[];
}

export type ValueType = string | number | boolean;
