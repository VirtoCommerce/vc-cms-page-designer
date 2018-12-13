import { EditorActionTypes, EditorActions } from './editor.actions';
import { BlocksSchema, BlockValuesModel } from 'src/app/modules/shared/models';
import { PageModel } from '../models';
import { typeSourceSpan } from '@angular/compiler';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: BlockValuesModel;
    error: string;
    pageLoading: boolean;
    initialPage: string;
    page: PageModel;
    blocksSchema: BlocksSchema;
    previewIsReady: boolean;
    // categories: CategoryModel[];
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
    blocksSchema: null,
    previewIsReady: false,
    // categories: [],
    dirty: true,
    primaryFrameId: 'preview1',
    secondaryFrameId: 'preview2'
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.AddPageItem:
            state.page.content.push(action.payload);
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: action.payload,
                dirty: true
            };
        case EditorActionTypes.BlockTypesLoaded:
            return {
                ...state,
                blocksSchema: action.payload
            };
        case EditorActionTypes.ClearPageChanges:
            return {
                ...state,
                page: JSON.parse(state.initialPage),
                dirty: false
            };
        case EditorActionTypes.CompleteEditPageItem:
            return {
                ...state,
                currentSectionItem: null
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
        case EditorActionTypes.OrderChanged:
            return {
                ...state,
                dirty: true
            };
        case EditorActionTypes.PreviewReady:
            return {
                ...state,
                previewIsReady: true
            };
        case EditorActionTypes.RemovePageItem:
            const index = state.page.content.indexOf(action.payload);
            if (index !== -1) {
                state.page.content.splice(index, 1);
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
            if (!!state.blocksSchema[state.currentSectionItem.type].static) {
                state.page.settings = {
                    ...state.currentSectionItem,
                    type: 'settings'
                };
            }
            return {
                ...state,
                dirty: true
            };
    }
    return state;
}
