import { EditorActionTypes, EditorActions } from './editor.actions';
import { BlocksSchema, BlockValuesModel } from 'src/app/modules/shared/models';
import { PageModel } from '../models';

export interface EditorState {
    showNewBlockSelector: boolean;
    currentSectionItem: BlockValuesModel;
    error: string;
    pageLoading: boolean;
    initialPage: string;
    page: PageModel;
    blocksSchema: BlocksSchema;
    // categories: CategoryModel[];
    dirty: boolean;
    primaryFrameId: string;
    secondaryFrameId: string;
    primaryLoaded: boolean;
    secondaryLoaded: boolean;
}

const initialState: EditorState = {
    showNewBlockSelector: false,
    currentSectionItem: null,
    error: '',
    pageLoading: false,
    initialPage: null,
    page: null,
    blocksSchema: null,
    // categories: [],
    dirty: true,
    primaryFrameId: null,
    secondaryFrameId: null,
    primaryLoaded: false,
    secondaryLoaded: false
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.AddPageItem: {
            const block = action.payload;
            if (!block.id) {
                block.id = Math.max(...state.page.content.map(v => <number>v.id || 0)) + 1;
            }
            state.page.content.push(block);
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: block,
                dirty: true
            };
        }
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
        case EditorActionTypes.ClonePageItem: {
            const page = state.page;
            const index = page.content.indexOf(action.payload.oldBlock);
            page.content.splice(index + 1, 0, action.payload.newBlock);
            return {
                ...state,
                dirty: true
            };
        }
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
        case EditorActionTypes.MoveBlock: {
            const page = state.page;
            const block = page.content.splice(action.payload.oldIndex, 1)[0];
            const acc = action.payload.oldIndex >= action.payload.newIndex ? 0 : 1;
            page.content.splice(action.payload.newIndex - acc, 0, block);
            return {
                ...state
            };
        }
        case EditorActionTypes.OrderChanged:
            return {
                ...state,
                dirty: true
            };
        case EditorActionTypes.PreviewReady: {
            // occurs when each iframe is loaded
            const newValues: Partial<EditorState> = {};
            if (!state.primaryFrameId) {
                newValues.primaryFrameId = action.payload;
                newValues.primaryLoaded = true;
            } else if (!state.secondaryFrameId) {
                newValues.secondaryFrameId = action.payload;
                newValues.secondaryLoaded = true;
            }
            return {
                ...state,
                ...newValues
            };
        }
        case EditorActionTypes.RemovePageItem: {
            const index = state.page.content.indexOf(action.payload);
            if (index !== -1) {
                state.page.content.splice(index, 1);
            }
            return {
                ...state,
                currentSectionItem: null,
                dirty: true
            };
        }
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
        case EditorActionTypes.ToggleFrames: {
            // occurs when page in preview rendered
            const newValues: Partial<EditorState> = {};
            newValues.primaryFrameId = state.secondaryFrameId;
            newValues.secondaryFrameId = state.primaryFrameId;
            return {
                ...state,
                ...newValues
            };
        }
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
