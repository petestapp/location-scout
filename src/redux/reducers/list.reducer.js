const selectedList = (state = 0, action) => {
    switch (action.type) {
        case 'SET_SELECTED_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default selectedList;