export class BlockValuesModel {
    type: string;
    [key: string]: ValueType | ValueType[];
}

export type ValueType = string | number | boolean;
