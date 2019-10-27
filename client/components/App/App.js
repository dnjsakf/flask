import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSelect, actionInsert } from './../../reducers/crud'

const App = memo(()=>{

    const { data, status } = useSelector(({ crud })=>(
        crud
    ), []);

    const refInputNo = useRef();
    const refInputTitle = useRef();
    const refInputAuthor = useRef();

    const dispatch = useDispatch();
    const getDataList = useCallback(( options )=>{
        console.log( '[APP] getDataList, [ dispatch ]', options )
        dispatch( actionSelect( options ) );
    }, [ dispatch ]);
    const insertData = useCallback(( options )=>{
        console.log( '[APP] insertData, [ dispatch ]', options )
        dispatch( actionInsert( options ) );
    }, [ dispatch ]);

    const handleGetData = useCallback((e)=>{
        e.preventDefault();
        getDataList({
            method: 'get'
            , url: 'http://localhost:3000/list'
        });
    }, [ dispatch ]);

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        const formData = {
            no: refInputNo.current.value
            , title: refInputTitle.current.value
            , author: refInputAuthor.current.value
        }
        console.log( '[APP] handleSubmit, [ dispatch ]', formData );
        insertData({
            method: 'POST'
            , url: 'http://localhost:3000/list'
            , data: formData
        })
    }, [ dispatch ]);

    useEffect(()=>{
        console.log('[APP] useEffect, [ data ]', data );
    }, [ data ]);

    // useEffect(()=>{
    //     console.log('[APP] useEffect, [ status ]', status );
    // }, [ status ]);

    return(
        <>
            <h1>data</h1>
            <button onClick={ handleGetData }>GET</button>
            <form onSubmit={ handleSubmit }>
                <input type="text" ref={ refInputNo } name="no" placeholder="no"/>
                <input type="text" ref={ refInputTitle }name="title" placeholder="title"/>
                <input type="text" ref={ refInputAuthor } name="author" placeholder="author"/>
                <button>submit</button>
            </form>
            <ul>
            { status == 200 && ( data.map(( item, idx )=>( <li key={ idx }>{ item.no }</li> )) ) }
            </ul>
        </>
    )
})

export default App