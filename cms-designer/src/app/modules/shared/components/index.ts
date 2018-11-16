export * from './accordion/accordion.component';
export * from './accordion/acc-item.component';
export * from './block-form/block-form.component';
export * from './elements-form/elements-form.component';
export * from './section-icon.directive';
export * from './tabs/tabs.component';
export * from './tabs/tab.component';
export * from './draggable/draggable.directive';
export * from './draggable/draggable-helper.directive';
export * from './draggable/sortable-list.directive';
export * from './control-holder.component';
export * from './control-host.directive';

import { AccordeonComponent } from './accordion/accordion.component';
import { AccItemComponent } from './accordion/acc-item.component';
import { BlockFormComponent } from './block-form/block-form.component';
import { ElementsFormComponent } from './elements-form/elements-form.component';
import { SectionIconDirective } from './section-icon.directive';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DraggableHelperDirective } from './draggable/draggable-helper.directive';
import { SortableListDirective } from './draggable/sortable-list.directive';
import { ControlHolderComponent } from './control-holder.component';
import { ControlHostDirective } from './control-host.directive';

export const COMPONENTS = [
    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
    BlockFormComponent,
    SectionIconDirective,
    ControlHolderComponent,
    ControlHostDirective,
    ElementsFormComponent,

    DraggableDirective,
    DraggableHelperDirective,
    SortableListDirective
];
