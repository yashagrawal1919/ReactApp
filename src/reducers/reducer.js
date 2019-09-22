const initState = {
  formVal: '',
  selected: []
}

const reducer = (state = initState, action) => {
  if(action.type === 'UPDATE_SEARCH') {
    let newSearch = action.search;
    return {
      ...state,
      formVal: newSearch
    };
  } else if(action.type === 'ADD') {
    let newSelected = [...state.selected];
    newSelected.push(action.id);
    return {
      ...state,
      selected: newSelected
    };
  } else if(action.type === 'REMOVE') {
    let newSelected = [...state.selected];
    let index = newSelected.indexOf(action.id);
    newSelected.splice(index, 1);
    return {
      ...state,
      selected: [...newSelected]
    };
  } else if(action.type === 'CLEAR') {
    return {
      ...state,
      selected: []
    };
  }

  return state;
}

export default reducer;