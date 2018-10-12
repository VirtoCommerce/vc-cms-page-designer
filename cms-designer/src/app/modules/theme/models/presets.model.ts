export interface PresetsModel {
    current: string;
    presets: { [key: string]: { [key: string]: string | number | boolean } };
}
