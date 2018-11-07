export interface PresetsModel {
    current: { [key: string]: string | number | boolean } | string;
    presets: { [key: string]: { [key: string]: string | number | boolean } };
}
