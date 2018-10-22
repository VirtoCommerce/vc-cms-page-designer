import { SectionModel } from './section.model';

export interface PageModel {
    settings: SectionModel;
    sections: SectionModel[];
}
