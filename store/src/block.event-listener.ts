import { BlockViewModel } from './block.view-model';

export interface BlockEventListener {
    elementHover: (source: BlockViewModel) => void;
    elementClick: (source: BlockViewModel) => void;
}
