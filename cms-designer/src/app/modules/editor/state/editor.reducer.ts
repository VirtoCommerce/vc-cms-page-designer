import { EditorActionTypes, EditorActions } from './editor.actions';
import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: SectionModel;
    error: string;
    page: PageModel;
    blockTypes: any[];
}

const initialState: EditorState = {
    showNewBlockSelector: false,
    currentSectionItem: null,
    error: '',
    page: null,
    blockTypes: []
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.ToggleNewBlockPane:
            return {
                ...state,
                showNewBlockSelector: action.payload
            };
        case EditorActionTypes.BlockTypesLoaded:
            return {
                ...state,
                blockTypes: action.payload
            };
        case EditorActionTypes.LoadPageSuccess:
            const model = new PageModel();
            model.sections = action.payload.filter(x => x.type !== 'settings');
            const settings = action.payload.find(x => x.type === 'settings') || { type: 'settings' };
            model.settings = settings;
            return {
                ...state,
                page: model
            };
        case EditorActionTypes.LoadPageFail:
            return {
                ...state,
                error: action.payload
            };
        case EditorActionTypes.SelectPageItem:
            return {
                ...state,
                showNewBlockSelector: action.payload ? false : state.showNewBlockSelector,
                currentSectionItem: action.payload
            };
    }
    return state;
}
