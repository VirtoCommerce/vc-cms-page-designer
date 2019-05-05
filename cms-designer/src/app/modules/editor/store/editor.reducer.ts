import { EditorActionTypes, EditorActions } from './editor.actions';
import { BlocksSchema, BlockValuesModel } from '@shared/models';
import { PageModel } from '@editor/models';

export interface EditorState {
    pageLoading: boolean;
    schemaLoading: boolean;
    pageNotLoaded: boolean;
    schemaNotLoaded: boolean;

    showNewBlockSelector: boolean;
    currentSectionItem: number;
    initialPage: string;
    page: PageModel;
    blocksSchema: BlocksSchema;
    // categories: CategoryModel[];
    dirty: boolean;
    hoveredInPreviewId: number;
    editorMode: string;
}

const initialState: EditorState = {
    pageLoading: false,
    schemaLoading: false,
    pageNotLoaded: false,
    schemaNotLoaded: false,

    showNewBlockSelector: false,
    currentSectionItem: null,
    initialPage: null,
    page: null,
    blocksSchema: null,
    // categories: [],
    dirty: true,
    hoveredInPreviewId: 0,
    editorMode: 'normal'
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.AddPageItem: {
            state.page.content.push(action.payload); // ?? should it be a new page object?
            return {
                ...state,
                showNewBlockSelector: false,
                currentSectionItem: action.payload.id,
                dirty: true
            };
        }
        case EditorActionTypes.LoadBlocksSchema:
            return {
                ...state,
                schemaLoading: true
            };
        case EditorActionTypes.BlocksSchemaLoaded:
            return {
                ...state,
                blocksSchema: action.payload,
                schemaLoading: false,
                schemaNotLoaded: false
            };
        case EditorActionTypes.BlocksSchemaFail:
            return {
                ...state,
                schemaLoading: false,
                schemaNotLoaded: true
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
        case EditorActionTypes.SwapBlocks: {
            const element = state.page.content.splice(action.payload.previousIndex, 1);
            state.page.content.splice(action.payload.currentIndex, 0, ...element);
            return {
                ...state
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
                pageNotLoaded: true,
                pageLoading: false
            };
        case EditorActionTypes.LoadPageSuccess:
            return {
                ...state,
                page: action.payload,
                initialPage: JSON.stringify(action.payload),
                pageLoading: false,
                pageNotLoaded: false,
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
        case EditorActionTypes.UpdatePageItem: {
            const item = state.page.content.find(x => x.id === state.currentSectionItem);
            const type = item.type;
            Object.assign(item, action.payload);
            item.type = type;
            if (!!state.blocksSchema[type].static) {
                state.page.settings = {
                    ...item,
                    type: 'settings'
                };
            }
            return {
                ...state,
                dirty: true
            };
        }
        case EditorActionTypes.ToggleItemVisibility: {
            action.payload.hidden = !action.payload.hidden;
            return {
                ...state,
                dirty: true
            };
        }
        case EditorActionTypes.MarkSectionHoveredInPreview: {
            return {
                ...state,
                hoveredInPreviewId: action.payload
            };
        }
        case EditorActionTypes.SetEditorMode: {
            return {
                ...state,
                editorMode: action.payload
            };
        }
    }
    return state;
}
