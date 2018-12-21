export class BlockValuesModel {
    type: string;
    icon?: string;
    title?: string;
    [key: string]: ValueType | ValueType[];
}

export type ValueType = string | number | boolean;
