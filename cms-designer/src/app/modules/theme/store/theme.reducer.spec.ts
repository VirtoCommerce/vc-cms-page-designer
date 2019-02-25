import { HttpErrorResponse } from '@angular/common/http';
import { BlockSchema, ColorControlDescriptor } from '@shared/models';
import * as fromTheme from './theme.reducer';
import * as themeActions from './theme.actions';

describe('Theme reducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromTheme;
            const action = {} as any;
            const state = fromTheme.reducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });

    describe('LoadSchema action', () => {
        it('should set schemaLoading to true', () => {
            // arrange
            const { initialState } = fromTheme;
            const action = new themeActions.LoadSchema();
            // act
            const state = fromTheme.reducer(initialState, action);
            // assert
            expect(state.schemaLoading).toEqual(true);
            expect(state.schema).toEqual([]);
        });
    });

    describe('LoadSchemaSuccess action', () => {
        // arrange
        const schema = <BlockSchema[]>[
            {
                name: 'Colors',
                icon: 'colors',
                settings: [
                    <ColorControlDescriptor>{
                        type: 'color',
                        id: 'text-color',
                        value: 'black'
                    }
                ]
            },
            {
                name: 'Values',
                icon: 'values',
                settings: [
                    {
                        type: 'value',
                        id: 'text-value',
                        value: 'OK'
                    }
                ]
            }
        ];
        const { initialState } = fromTheme;
        const loadingState = { ...initialState, schemaLoading: true };
        const action = new themeActions.LoadSchemaSuccess(schema);
        // act
        const state = fromTheme.reducer(loadingState, action);
        // assert
        it('should populate array', () => {
            expect(state.schema).toBe(schema);
        });
        it('should loading flag to false', () => {
            expect(state.schemaLoading).toEqual(false);
        });
    });

    describe('LoadSchemaFail action', () => {
        const { initialState } = fromTheme;
        const loadingState = { ...initialState, schemaLoading: true };
        const message = 'Something went wrong';
        const action = new themeActions.LoadSchemaFail(new HttpErrorResponse({ error: message }));
        const state = fromTheme.reducer(loadingState, action);

        it('should set the given error message', () => {
            expect(state.schema).toEqual([]);
        });

        it('should reset loading flag to false', () => {
            expect(state.schemaLoading).toEqual(false);
        });
    });

    describe('SaveTheme action', () => {
        const editableTheme = {
            property1: 'value 1',
            property2: 'value 2',
            property3: 'value 3'
        };
        const presets = {
            current: 'top',
            presets: {
                top: {
                    property1: 'top value 1',
                    property2: 'top value 2',
                    property3: 'top value 3'
                },
                other: {
                    property1: 'other value 1',
                    property2: 'other value 2',
                    property3: 'other value 3'
                }
            }
        };
        const themeToSave = {
            current: editableTheme,
            presets: presets.presets
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets };
        const action = new themeActions.SaveTheme();
        const state = fromTheme.reducer(currentState, action);

        it('should set current theme from editableTheme', () => {
            expect(state.presets).toEqual(themeToSave);
        });
        it('should create new theme object', () => {
            expect(state.presets.current).not.toBe(editableTheme);
            expect(state.presets).not.toBe(presets);
        });
    });

    describe('SaveThemesSuccess action', () => {
        const presets = {
            current: 'top',
            presets: {
                top: {
                    property1: 'top value 1',
                    property2: 'top value 2',
                    property3: 'top value 3'
                },
                other: {
                    property1: 'other value 1',
                    property2: 'other value 2',
                    property3: 'other value 3'
                }
            }
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, presets, dirty: true };
        const action = new themeActions.SaveThemeSuccess();
        const state = fromTheme.reducer(currentState, action);
        it('should serialize current themes to initialPresets', () => {
            const serializedPresets = JSON.stringify(presets);
            expect(state.initialPresets).toEqual(serializedPresets);
        });
        it('should reset dirty flag', () => {
            expect(state.dirty).toEqual(false);
        });
    });

    describe('LoadThemes action', () => {
        const { initialState } = fromTheme;
        const action = new themeActions.LoadThemes();
        const state = fromTheme.reducer(initialState, action);
        it('should set theme loading to true', () => {
            expect(state.presetsLoading).toEqual(true);
        });
    });

    describe('LoadThemesSuccess action', () => {
        describe('when current theme is a preset property', () => {
            const presets = {
                current: 'top',
                presets: {
                    top: {
                        property1: 'value 1',
                        property2: 'value 2'
                    }
                }
            };
            const { initialState } = fromTheme;
            const currentState = { ...initialState, presetsLoading: true };
            const action = new themeActions.LoadThemesSuccess(presets);
            const state = fromTheme.reducer(currentState, action);
            it('should set editableTheme to correct presets in other object', () => {
                expect(state.editableTheme).toEqual(presets.presets.top);
                expect(state.editableTheme).not.toBe(presets.presets.top);
            });
            it('should set presets current property to current preset', () => {
                const workingPresets = { ...presets, current: presets.presets.top };
                expect(state.presets).toEqual(workingPresets);
                expect(state.presets.current).toEqual(presets.presets.top);
                expect(state.presets.current).not.toBe(presets.presets.top);
                expect(state.presets.current).not.toBe(state.editableTheme);
            });
            it('should store presets for restoring', () => {
                const serialized = JSON.stringify(presets);
                expect(state.initialPresets).toEqual(serialized);
            });
            it('should reset loading flag', () => {
                expect(state.presetsLoading).toEqual(false);
            });
        });
        describe('when current theme is an object', () => {
            const presets = {
                current: {
                    property1: 'current value 1',
                    property2: 'current value 2'
                },
                presets: {
                    top: {
                        property1: 'value 1',
                        property2: 'value 2'
                    }
                }
            };
            const { initialState } = fromTheme;
            const currentState = { ...initialState, presetsLoading: true };
            const action = new themeActions.LoadThemesSuccess(presets);
            const state = fromTheme.reducer(currentState, action);
            it('should set editable object from given current theme', () => {
                expect(state.editableTheme).toEqual(presets.current);
                expect(state.editableTheme).not.toBe(presets.current);
            });
            it('should not change a given presets', () => {
                expect(state.presets).toEqual(presets);
            });
            it('should store presets for restoring', () => {
                const serialized = JSON.stringify(presets);
                expect(state.initialPresets).toEqual(serialized);
            });
            it('should reset loading flag', () => {
                expect(state.presetsLoading).toEqual(false);
            });
        });
    });
    describe('LoadThemesFail action', () => {
        const { initialState } = fromTheme;
        const currentState = { ...initialState, presetsLoading: true };
        const message = 'something went wrong';
        const action = new themeActions.LoadThemesFail(new HttpErrorResponse({ error: message }));
        const state = fromTheme.reducer(currentState, action);
        it('should reset loading flag and set correct error value', () => {
            expect(state.presetsLoading).toEqual(false);
        });
    });
    describe('SelectSchemaItem action', () => {
        const { initialState } = fromTheme;
        const item = { name: 'item', icon: 'item', settings: [] };
        const action = new themeActions.SelectSchemaItem(item);
        const state = fromTheme.reducer(initialState, action);
        it('should set current schema item to a given', () => {
            expect(state.selectedSchemaItem).toBe(item);
        });
    });
    describe('ShowPresetsPane action', () => {
        const { initialState } = fromTheme;
        const action = new themeActions.ShowPresetsPane();
        const state = fromTheme.reducer(initialState, action);
        it('should set showPresetsEditor to true', () => {
            expect(state.showPresetsEditor).toEqual(true);
        });
    });
    describe('CancelPreset action', () => {
        const presets = {
            current: null,
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                }
            }
        };
        const editableTheme = {
            property1: 'current value 1',
            property2: 'current value 2'
        };
        presets.current = presets.presets.top;
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets, showPresetsEditor: true };
        const action = new themeActions.CancelPreset();
        const state = fromTheme.reducer(currentState, action);
        it('should revert presets.current', () => {
            expect(state.presets.current).toEqual(editableTheme);
            expect(state.presets).not.toBe(presets);
        });
        it('should hide presets editor', () => {
            expect(state.showPresetsEditor).toEqual(false);
        });
    });
    describe('ApplyPreset action', () => {
        const presets = {
            current: null,
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                }
            }
        };
        const editableTheme = {
            property1: 'current value 1',
            property2: 'current value 2'
        };
        presets.current = { ...editableTheme };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets, showPresetsEditor: true, dirty: false };
        const action = new themeActions.ApplyPreset('top');
        const state = fromTheme.reducer(currentState, action);
        it('should apply previewed preset to editableTheme', () => {
            expect(state.editableTheme).toEqual(presets.presets.top);
            expect(state.editableTheme).not.toBe(presets.presets.top);
            expect(state.editableTheme).not.toBe(presets.current);
        });
        it('should set presets.current to given preset', () => {
            expect(state.presets.current).toEqual(presets.presets.top);
            expect(state.presets.current).not.toBe(presets.presets.top);
        });
        it('should hide presets editor', () => {
            expect(state.showPresetsEditor).toEqual(false);
        });
        it('should set dirty flag to true', () => {
            expect(state.dirty).toEqual(true);
        });
    });
    describe('UpdateTheme action', () => {
        const presets = {
            current: null,
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                }
            }
        };
        const editableTheme = {
            property1: 'current value 1',
            property2: 'current value 2'
        };
        presets.current = { ...editableTheme };
        const updatePart = {
            newProperty1: 'new property 1',
            newProperty2: 'new property 2'
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets, dirty: false };
        const action = new themeActions.UpdateTheme(updatePart);
        const state = fromTheme.reducer(currentState, action);
        it('should update the editable theme', () => {
            const newValue = { ...editableTheme, ...updatePart };
            expect(state.editableTheme).toEqual(newValue);
            expect(state.editableTheme).not.toBe(editableTheme);
        });
        it('should update the preset\'s current property', () => {
            const newValue = { ...editableTheme, ...updatePart };
            expect(state.presets.current).toEqual(newValue);
            expect(state.presets).not.toBe(presets);
            expect(state.presets.current).not.toBe(state.editableTheme);
        });
        it('should set dirty property to true', () => {
            expect(state.dirty).toEqual(true);
        });
    });
    describe('ClearThemeChanges action', () => {
        describe('when current is an object', () => {
            const presets = {
                current: {
                    property1: 'current value 1',
                    property2: 'current value 2'
                },
                presets: {
                    top: {
                        property1: 'value 1',
                        property2: 'value 2'
                    }
                }
            };
            const { initialState } = fromTheme;
            const currentState = {
                ...initialState,
                initialPresets: JSON.stringify(presets),
                dirty: true
            };
            const action = new themeActions.ClearThemeChanges();
            const state = fromTheme.reducer(currentState, action);
            it('should set presets as initial', () => {
                expect(state.presets).toEqual(presets);
            });
            it('should set editableTheme as presets.current', () => {
                expect(state.editableTheme).toEqual(<any>state.presets.current);
                expect(state.editableTheme).not.toBe(<any>state.presets.current);
            });
            it('should reset dirty flag', () => {
                expect(state.dirty).toEqual(false);
            });
        });
        describe('when current is a preset property name', () => {
            const presets = {
                current: 'top',
                presets: {
                    top: {
                        property1: 'value 1',
                        property2: 'value 2'
                    }
                }
            };
            const { initialState } = fromTheme;
            const currentState = {
                ...initialState,
                initialPresets: JSON.stringify(presets),
                dirty: true
            };
            const action = new themeActions.ClearThemeChanges();
            const state = fromTheme.reducer(currentState, action);
            it('should set presets as prepared initial', () => {
                const preparedPresets = { ...presets, current: presets.presets[presets.current] };
                expect(state.presets).toEqual(preparedPresets);
            });
            it('should set editableTheme as presets.current', () => {
                expect(state.editableTheme).toEqual(<any>state.presets.current);
                expect(state.editableTheme).not.toBe(<any>state.presets.current);
            });
            it('should reset dirty flag', () => {
                expect(state.dirty).toEqual(false);
            });
        });
    });
    describe('RemovePreset action', () => {
        const presets = {
            current: {
                property1: 'current value 1',
                property2: 'current value 2'
            },
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                },
                other: {
                    property1: 'other value 1',
                    property2: 'other value 2'
                }
            }
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, presets, dirty: false };
        const action = new themeActions.RemovePreset('other');
        const state = fromTheme.reducer(currentState, action);
        it('should remove the \'other\' preset', () => {
            expect(state.presets.presets.other).toBeUndefined();
            expect(state.presets).not.toBe(presets);
        });
        it('should set dirty to true', () => {
            expect(state.dirty).toEqual(true);
        });
    });
    describe('CreatePreset action', () => {
        const presets = {
            current: {
                property1: 'current value 1',
                property2: 'current value 2'
            },
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                }
            }
        };
        const editableTheme = {
            property1: 'new value 1',
            property2: 'new value 2'
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets, dirty: false };
        const action = new themeActions.CreatePreset('other');
        const state = fromTheme.reducer(currentState, action);
        it('should create the \'other\' preset', () => {
            expect(state.presets.presets.other).toEqual(editableTheme);
            expect(state.editableTheme).not.toBe(state.presets.presets.other);
            expect(state.presets).not.toBe(presets);
        });
        it('should set dirty to true', () => {
            expect(state.dirty).toEqual(true);
        });
    });
    describe('SelectPreset action', () => {
        const presets = {
            current: {
                property1: 'current value 1',
                property2: 'current value 2'
            },
            presets: {
                top: {
                    property1: 'value 1',
                    property2: 'value 2'
                }
            }
        };
        const editableTheme = {
            property1: 'new value 1',
            property2: 'new value 2'
        };
        const { initialState } = fromTheme;
        const currentState = { ...initialState, editableTheme, presets, dirty: false };
        const action = new themeActions.SelectPreset('top');
        const state = fromTheme.reducer(currentState, action);
        it('should set the current theme to given preset', () => {
            expect(state.presets.current).toEqual(presets.presets.top);
            expect(state.presets).not.toBe(presets);
        });
        it('should not change theme under edit', () => {
            expect(state.editableTheme).toEqual(editableTheme);
        });
        it('should not touch the dirty flag', () => {
            expect(state.dirty).toEqual(false);
        });
    });
});
