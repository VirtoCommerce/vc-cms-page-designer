import { EditorActionTypes, EditorActions } from './editor.actions';
import { PageModel, SectionModel, BlockType, CategoryModel } from '../models';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: SectionModel;
    error: string;
    pageLoading: boolean;
    initialPage: string;
    page: PageModel;
    blockTypes: BlockType[];
    previewIsReady: boolean;
    categories: CategoryModel[];
    dirty: boolean;
    primaryFrameId: string;
    secondaryFrameId: string;
}

const initialState: EditorState = {
    showNewBlockSelector: false,
    currentSectionItem: null,
    error: '',
    pageLoading: false,
    initialPage: null,
    page: null,
    blockTypes: [],
    previewIsReady: false,
    categories: [],
    dirty: true,
    primaryFrameId: 'preview1',
    secondaryFrameId: 'preview2'
};
// todo: state should be immutable, in this case objects in state are mutable
export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.AddPageItem:
            state.page.sections.push(action.payload);
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: action.payload,
                dirty: true
            };
        case EditorActionTypes.BlockTypesLoaded:
            return {
                ...state,
                blockTypes: action.payload
            };
        case EditorActionTypes.ClearPageChanges:
            return {
                ...state,
                page: JSON.parse(state.initialPage),
                dirty: false
            };
        case EditorActionTypes.LoadCategoriesFail:
            return {
                ...state,
                error: action.payload
            };
        case EditorActionTypes.LoadCategoriesSuccess:
            return {
                ...state,
                categories: action.payload
            };
        case EditorActionTypes.LoadPage:
            return {
                ...state,
                pageLoading: true
            };
        case EditorActionTypes.LoadPageFail:
            return {
                ...state,
                error: action.payload,
                pageLoading: false
            };
        case EditorActionTypes.LoadPageSuccess:
            return {
                ...state,
                page: action.payload,
                initialPage: JSON.stringify(action.payload),
                pageLoading: false,
                dirty: false
            };
        case EditorActionTypes.PreviewReady:
            return {
                ...state,
                previewIsReady: true
            };
        case EditorActionTypes.RemovePageItem:
            const index = state.page.sections.indexOf(action.payload);
            if (index !== -1) {
                state.page.sections.splice(index, 1);
            }
            return {
                ...state,
                currentSectionItem: null,
                dirty: true
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
        case EditorActionTypes.SavePageSuccess:
            return {
                ...state,
                pageLoading: false,
                initialPage: JSON.stringify(state.page),
                dirty: false
            };
        case EditorActionTypes.SelectPageItem:
            return {
                ...state,
                showNewBlockSelector: action.payload ? false : state.showNewBlockSelector,
                currentSectionItem: action.payload
            };
        case EditorActionTypes.ToggleFrames:
            return {
                ...state,
                primaryFrameId: state.secondaryFrameId,
                secondaryFrameId: state.primaryFrameId
            };
        case EditorActionTypes.ToggleNewBlockPane:
            return {
                ...state,
                showNewBlockSelector: action.payload
            };
        case EditorActionTypes.UpdatePageItem:
            Object.assign(state.currentSectionItem, action.payload);
            return {
                ...state,
                currentSectionItem: null,
                dirty: true
            };
    }
    return state;
}
