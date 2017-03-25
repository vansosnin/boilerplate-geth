import { createSelector } from 'reselect';

export const getMainPage = state => state.mainPage;

export const getTest = createSelector(
    getMainPage,
    page => ({
        ...page
    })
);
