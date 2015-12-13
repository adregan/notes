import Immutable from 'immutable';

const notes = Immutable.List(Immutable.Range(1, 10).map(i => {
  return Immutable.Map({title: `Note ${i}`})
}))

export default notes;