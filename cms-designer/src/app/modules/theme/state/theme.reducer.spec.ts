import * as fromTheme from './theme.reducer';

describe('Theme reducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromTheme;
            const action = {} as any;
            const state = fromTheme.reducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });
});
