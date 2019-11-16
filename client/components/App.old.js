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

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        const params = {
            page: refInputPage.current.value || 1
            , cate: refInputCate.current.value
            , community: refInputCommunity.current.value
        }
        getDataList({
            method: 'get'
            , url: 'http://localhost:3000/list/'+params.community+'/'+params.cate+'/'+params.page
        })
    }, [ dispatch ]);

    const handleGetData = useCallback((e)=>{
        e.preventDefault();
        const params = {
            page: refInputPage.current.value || 1
            , cate: refInputCate.current.value
            , community: refInputCommunity.current.value
        }
        console.log( '[APP] handleGetData, [ dispatch ]', params );
        insertData({
            method: 'POST'
            , url: 'http://localhost:3001/crawl.json'
            , data : {
                spiderName: params.community
                , cate: params.cate
                , page: params.page
                , start_request: true
            }
            , proxy: {
                host: 'localhost'
                , port: 4000
            }
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
                <input type='text' ref={ refInputCommunity } name='community' placeholder='community' defaultValue='ygosu'/>
                <input type='text' ref={ refInputPage } name='page' placeholder='page' defaultValue='1'/>
                <input type='text' ref={ refInputCate } name='cate' placeholder='category' defaultValue='yeobgi'/>
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