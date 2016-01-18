/*ACTION TYPES*/
export const SEARCH = 'SEARCH';

/*ACTION CREATORS*/
export const search = (term) => {
  return {type: SEARCH, term};
}
