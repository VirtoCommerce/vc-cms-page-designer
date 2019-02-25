export * from './accordion/accordion.component';
export * from './accordion/acc-item.component';
export * from './actions-dropdown/actions-dropdown.component';
export * from './block-form/block-form.component';
export * from './elements-form/elements-form.component';
export * from './tabs/tabs.component';
export * from './tabs/tab.component';
export * from './control-holder.component';
export * from './control-host.directive';

import { AccordeonComponent } from './accordion/accordion.component';
import { AccItemComponent } from './accordion/acc-item.component';
import { ActionsDropdownComponent } from './actions-dropdown/actions-dropdown.component';
import { BlockFormComponent } from './block-form/block-form.component';
import { ElementsFormComponent } from './elements-form/elements-form.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { ControlHolderComponent } from './control-holder.component';
import { ControlHostDirective } from './control-host.directive';

export const COMPONENTS = [
    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
    ActionsDropdownComponent,
    BlockFormComponent,
    ControlHolderComponent,
    ControlHostDirective,
    ElementsFormComponent
];
