import { SettingModel } from './setting.model';

export interface SchemaItemModel {
    name: string;
    icon: string;
    settings: SettingModel[];
}
