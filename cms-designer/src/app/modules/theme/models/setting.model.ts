export interface SettingModel {
    type: string;
    id?: string;
    content?: string;
    label?: string;
    info?: string;
    options?: { label: string; value: string; group?: string }[];
}
