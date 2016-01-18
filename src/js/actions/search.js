/*ACTION TYPES*/
export const SEARCH = 'SEARCH';

/*ACTIONS*/
export const search = (searchTerm) => {
  return {type: SEARCH, searchTerm};
}
