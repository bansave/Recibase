const InitialState = {Password:'', Username:'', Id:0};

export default (state=InitialState, action) => {
    // console.log('Ini Reducer')
    // console.log(action);
    switch(action.type) {
        case 'userlogin':
            console.log('ini payload login',action.payload);
            return {...state,
                 Password: action.payload.Password, 
                 Username: action.payload.Username,
                 Id: action.payload.Id};
        default:
            return state;
    }
};
