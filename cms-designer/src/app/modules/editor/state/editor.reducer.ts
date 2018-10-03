import { EditorActionTypes, EditorActions } from './editor.actions';
import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: SectionModel;
    error: string;
    pageLoading: boolean;
    page: PageModel;
    blockTypes: any[];
    previewIsReady: boolean;
}

const initialState: EditorState = {
    showNewBlockSelector: false,
    currentSectionItem: null,
    error: '',
    pageLoading: false,
    page: null,
    blockTypes: [],
    previewIsReady: false
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
        case EditorActionTypes.PreviewReady:
            return {
                ...state,
                previewIsReady: true
            };
        case EditorActionTypes.LoadPage:
            return {
                ...state,
                pageLoading: true
            };
        case EditorActionTypes.LoadPageSuccess:
            return {
                ...state,
                page: action.payload,
                pageLoading: false
            };
        case EditorActionTypes.LoadPageFail:
            return {
                ...state,
                error: action.payload,
                pageLoading: false
            };
        case EditorActionTypes.SelectPageItem:
            return {
                ...state,
                showNewBlockSelector: action.payload ? false : state.showNewBlockSelector,
                currentSectionItem: action.payload
            };
        case EditorActionTypes.UpdatePageItem:
            Object.assign(state.currentSectionItem, action.payload);
            return {
                ...state,
                currentSectionItem: null
            };
        case EditorActionTypes.RemovePageItem:
            console.log(action.payload);
            const index = state.page.sections.indexOf(action.payload);
            if (index !== -1) {
                state.page.sections.splice(index, 1);
            }
            return {
                ...state,
                currentSectionItem: null
            };
        case EditorActionTypes.AddPageItem:
            state.page.sections.push(action.payload);
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: action.payload
            };
    }
    return state;
}
