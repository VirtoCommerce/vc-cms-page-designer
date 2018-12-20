import { EditorActionTypes, EditorActions } from './editor.actions';
import { BlocksSchema, BlockValuesModel } from 'src/app/modules/shared/models';
import { PageModel } from '../models';

export interface EditorState {
    pageLoading: boolean;
    schemaLoading: boolean;
    pageLoaded: boolean;
    schemaLoaded: boolean;

    showNewBlockSelector: boolean;
    currentSectionItem: BlockValuesModel;
    initialPage: string;
    page: PageModel;
    blocksSchema: BlocksSchema;
    // categories: CategoryModel[];
    dirty: boolean;
}

const initialState: EditorState = {
    pageLoading: false,
    schemaLoading: false,
    pageLoaded: false,
    schemaLoaded: false,

    showNewBlockSelector: false,
    currentSectionItem: null,
    initialPage: null,
    page: null,
    blocksSchema: null,
    // categories: [],
    dirty: true
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.AddPageItem: {
            state.page.content.push(action.payload); // ?? should it be a new page object?
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: action.payload,
                dirty: true
            };
        }
        case EditorActionTypes.BlocksSchemaLoaded:
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
                pageLoaded: false,
                pageLoading: false
            };
        case EditorActionTypes.LoadPageSuccess:
            return {
                ...state,
                page: action.payload,
                initialPage: JSON.stringify(action.payload),
                pageLoading: false,
                pageLoaded: true,
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
                pageLoading: false
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
