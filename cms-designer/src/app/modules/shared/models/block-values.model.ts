export class BlockValuesModel {
    id?: number;
    type: string;
    icon?: string;
    title?: string;
    hidden?: boolean;
    [key: string]: ValueType | ValueType[];
}

export type ValueType = string | number | boolean;
