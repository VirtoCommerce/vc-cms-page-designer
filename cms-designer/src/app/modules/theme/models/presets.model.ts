import { ValueType } from './index';

export interface PresetsModel {
    current: { [key: string]: ValueType } | string;
    presets: { [key: string]: { [key: string]: ValueType } };
}
