export const SELECT = 'crud/SELECT'
export const SELECT_SUCCESS = 'crud/SELECT_SUCCESS'
export const SELECT_FAILURE = 'crud/SELECT_FAILURE'

export const INSERT = 'crud/INSERT'
export const INSERT_SUCCESS = 'crud/INSERT_SUCCESS'
export const INSERT_FAILURE = 'crud/INSERT_FAILURE'

export const UPDATE = 'crud/UPDATE'
export const UPDATE_SUCCESS = 'crud/INSERT_SUCCESS'
export const UPDATE_FAILURE = 'crud/INSERT_FAILURE'

export const DELETE = 'crud/DELETE'
export const DELETE_SUCCESS = 'crud/DELETE_SUCCESS'
export const DELETE_FAILURE = 'crud/DELETE_FAILURE'


export const actionSelect = ( payload )=>({ type: SELECT, payload: payload })
export const actionInsert = ( payload )=>({ type: SELECT, payload: payload })
export const actionDelete = ( payload )=>({ type: SELECT, payload: payload })
export const actionUpdate = ( payload )=>({ type: SELECT, payload: payload })

const initState = {
    result: null
    , status: 200
    , data: []
    , params: []
    , response: null
}

const crudReducer = ( state=initState, action )=>{
    switch( action.type ){
        /******** SELECT ********/
        case SELECT:
            return state;

        case SELECT_SUCCESS:
            return state;

        case SELECT_FAILURE:
            return state;
        /************************/
        /******** INSERT ********/
        case INSERT:
            return state;

        case INSERT_SUCCESS:
            return state;

        case INSERT_FAILURE:
            return state;
        /************************/
        /******** UPDATE ********/
        case UPDATE:
            return state;

        case UPDATE_SUCCESS:
            return state;

        case UPDATE_FAILURE:
            return state;
        /************************/
        /******** DELETE ********/
        case DELETE:
            return state;

        case DELETE_SUCCESS:
            return state;

        case DELETE_FAILURE:
            return state;
        /************************/
        
        default:
            return state;
    }
}

export default crudReducer;