import React, { memo, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSelect } from './../../reducers/crud'

import logger from './../../config/logger'

const App = memo(()=>{

    const data = useSelector(({ crud })=>(
        crud.data
    ), []);

    const dispatch = useDispatch();
    const onGetData = useCallback(( options )=>{

        logger.info( 'call',options );

        dispatch( actionSelect( options ) );
    }, [ dispatch ]);

    const handleGetData = useCallback((e)=>{
        e.preventDefault();
        const options = {
            method: 'get'
            , url: 'http://localhost:3000/list'
        }
        onGetData( options );
    }, [ dispatch ]);

    useEffect(()=>{
        logger.info( 'changed data', data );
    }, [ data ]);

    return(
        <>
            <h1>data</h1>
            <button onClick={ handleGetData }>GET</button>
        </>
    )
})

export default App