const coordinates = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLICKED_COORDINATES':
            return action.payload;
        default:
            return state;
    }
}

export default coordinates;