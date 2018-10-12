import { EditorActionTypes, EditorActions } from './editor.actions';
import { PageModel, SectionModel, BlockType } from '../models';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: SectionModel;
    error: string;
    pageLoading: boolean;
    initialPage: string;
    page: PageModel;
    blockTypes: BlockType[];
    previewIsReady: boolean;
}

const initialState: EditorState = {
    showNewBlockSelector: false,
    currentSectionItem: null,
    error: '',
    pageLoading: false,
    initialPage: null,
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
                initialPage: JSON.stringify(action.payload),
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
        case EditorActionTypes.SavePageSuccess:
            return {
                ...state,
                pageLoading: false,
                initialPage: JSON.stringify(state.page)
            };
        case EditorActionTypes.SavePage:
            return {
                ...state,
                pageLoading: true
            };
        case EditorActionTypes.SavePageFail:
            return {
                ...state,
                pageLoading: false,
                error: action.payload
            };
        case EditorActionTypes.ClearPageChanges:
            return {
                ...state,
                page: JSON.parse(state.initialPage)
            };
    }
    return state;
}
