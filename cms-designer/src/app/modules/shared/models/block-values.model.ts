export class BlockValuesModel {
    type: string;
    [key: string]: ValueType
}

export type ValueType = string | number | boolean;
