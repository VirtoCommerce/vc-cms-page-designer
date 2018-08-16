import { SectionModel } from './section.model';

export class PageModel {
    title?: string;
    header?: string;
    name?: string;
    permalink?: string;
    metaDescription?: string;
    sections?: SectionModel[];
}
