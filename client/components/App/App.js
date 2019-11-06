import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSelect, actionInsert } from './../../reducers/crud'

const App = memo(()=>{

    const { data, status } = useSelector(({ crud })=>(
        crud
    ), []);

    const refInputPage = useRef();
    const refInputCate = useRef();
    const refInputCommunity = useRef();

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
        const params = {
            page: refInputPage.current.value || 1
            , cate: refInputCate.current.value
            , community: refInputCommunity.current.value
        }
        getDataList({
            method: 'get'
            , url: 'http://localhost:3000/list/'+params.page+'?cate='+params.cate
        })
    }, [ dispatch ]);

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        const formData = {
            page: refInputPage.current.value || 1
            , cate: refInputCate.current.value
            , community: refInputCommunity.current.value
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
            <button onClick={ handleSubmit }>GET</button>
            <form onSubmit={ handleGetData }>
                <input type='text' ref={ refInputCommunity } name='community' placeholder='community' value='ygosu'/>
                <input type='text' ref={ refInputPage } name='page' placeholder='page' value='1'/>
                <input type='text' ref={ refInputCate } name='cate' placeholder='category' value='yeobgi'/>
                <button>submit</button>
            </form>
            <ul>
            { status == 200 && ( data.map(( item, idx )=>( 
                <li key={ item.no }>{ item.no }&nbsp;&nbsp;<a href={ item.href }>{ item.tit }</a>&nbsp;&nbsp;{ item.name }&nbsp;&nbsp;{ item.load_dttm }</li> )) ) }
            </ul>
        </>
    )
})

export default App