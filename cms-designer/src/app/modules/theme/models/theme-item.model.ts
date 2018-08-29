import { SettingModel } from './setting.model';

export interface ThemeItemModel {
    name: string;
    icon: string;
    settings: SettingModel[];
}
