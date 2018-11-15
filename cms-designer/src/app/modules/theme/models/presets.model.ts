import { ValueType } from '../../shared/models';

export interface PresetsModel {
    current: { [key: string]: ValueType } | string;
    presets: { [key: string]: { [key: string]: ValueType } };
}
