const InitialState = {SearchText:''};

export default (state=InitialState, action) => {
    // console.log('Ini Reducer')
    // console.log(action);
    switch(action.type) {
        case 'Search':
            console.log(action.payload);
            return {...state,
                 SearchText: action.payload.search};
        default:
            return state;
    }
};
