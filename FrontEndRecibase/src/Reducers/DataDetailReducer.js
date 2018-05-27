const InitialState = {namaresep:'', bahan:[], bumbu:[], alat:[], step:`` , tipe:``};

export default (state=InitialState, action) => {
    // console.log('Ini Reducer')
    // console.log(action);
    switch(action.type) {
        case 'DetailItem':
            console.log(action.payload);
            return {...state,
                 namaresep: action.payload.namaresep,
                 bahan: action.payload.bahan,
                 bumbu: action.payload.bumbu,
                 alat: action.payload.alat,
                 tipe: action.payload.tipe,
                 step: action.payload.step};
        default:
            return state;
    }
};
    