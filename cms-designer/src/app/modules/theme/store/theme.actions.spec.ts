import { HttpErrorResponse } from '@angular/common/http';
import * as themeActions from './theme.actions';

describe('Theme actions', () => {
    describe('LoadThemes', () => {
        it('should create an action', () => {
            const action = new themeActions.LoadThemes();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadThemes });
        });
    });

    describe('LoadThemesSuccess', () => {
        it('should create an action with given payload', () => {
            const payload = {
                current: 'key',
                presets: {
                    key: {
                        key: 'value'
                    }
                }
            };
            const action = new themeActions.LoadThemesSuccess(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadThemesSuccess, payload: payload });
        });
    });

    describe('LoadThemesFail', () => {
        it('should create an action with given payload', () => {
            const payload = 'something went wrong';
            const action = new themeActions.LoadThemesFail(new HttpErrorResponse({ error: payload }));
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadThemesFail, payload: payload });
        });
    });

    describe('SaveTheme', () => {
        it('should create an action', () => {
            const action = new themeActions.SaveTheme();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.SaveTheme });
        });
    });

    describe('SaveThemeSuccess', () => {
        it('should create an action', () => {
            const action = new themeActions.SaveThemeSuccess();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.SaveThemeSuccess });
        });
    });

    describe('SaveThemeFail', () => {
        it('should create an action with given payload', () => {
            const payload = 'something went wrong';
            const action = new themeActions.SaveThemeFail(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.SaveThemeFail, payload: payload });
        });
    });

    describe('LoadSchema', () => {
        it('should create an action', () => {
            const action = new themeActions.LoadSchema();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadSchema });
        });
    });

    describe('LoadSchemaSuccess', () => {
        it('should create an action with given payload', () => {
            const payload = [
                {
                    name: 'payload name',
                    icon: 'default',
                    settings: [
                        {
                            type: 'test purposes'
                        }
                    ]
                }
            ];
            const action = new themeActions.LoadSchemaSuccess(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadSchemaSuccess, payload: payload });
        });
    });

    describe('LoadSchemaFail', () => {
        it('should create an action with given payload', () => {
            const payload = 'something went wrong';
            const action = new themeActions.LoadSchemaFail(new HttpErrorResponse({ error: payload }));
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.LoadSchemaFail, payload: payload });
        });
    });

    describe('SelectSchemaItem', () => {
        it('should create an action with given payload', () => {
            const payload = {
                name: 'test purposes',
                icon: 'default',
                settings: [
                    {
                        type: 'test purposes'
                    }
                ]
            };
            const action = new themeActions.SelectSchemaItem(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.SelectSchemaItem, payload: payload });
        });
    });

    describe('ShowPresetsPane', () => {
        it('should create an action', () => {
            const action = new themeActions.ShowPresetsPane();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.ShowPresetsPane });
        });
    });

    describe('CancelPreset', () => {
        it('should create an action', () => {
            const action = new themeActions.CancelPreset();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.CancelPreset });
        });
    });

    describe('ApplyPreset', () => {
        it('should create an action with given payload', () => {
            const payload = 'preset-name';
            const action = new themeActions.ApplyPreset(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.ApplyPreset, payload: payload });
        });
    });

    describe('UpdateTheme', () => {
        it('should create an action with given payload', () => {
            const payload = {
                color: 'red',
                width: 100,
                active: true
            };
            const action = new themeActions.UpdateTheme(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.UpdateTheme, payload: payload });
        });
    });

    describe('ClearThemeChanges', () => {
        it('should create an action', () => {
            const action = new themeActions.ClearThemeChanges();
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.ClearThemeChanges });
        });
    });

    describe('RemovePreset', () => {
        it('should create an action with given payload', () => {
            const payload = 'preset-to-remove';
            const action = new themeActions.RemovePreset(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.RemovePreset, payload: payload });
        });
    });

    describe('CreatePreset', () => {
        it('should create an action with given payload', () => {
            const payload = 'name-for-new-preset';
            const action = new themeActions.CreatePreset(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.CreatePreset, payload: payload });
        });
    });

    describe('SelectPreset', () => {
        it('should create an action with given payload', () => {
            const payload = 'selected-preset';
            const action = new themeActions.SelectPreset(payload);
            expect({ ...action }).toEqual({ type: themeActions.ThemeActionTypes.SelectPreset, payload: payload });
        });
    });
});
