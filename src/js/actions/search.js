/*ACTION TYPES*/
export const SEARCH = 'SEARCH';

/*ACTION CREATORS*/
export const createSearch = (term) => {
  return {type: SEARCH, term};
}
