import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSelect, actionInsert } from './../reducers/crud'

import Header from './Header/Header'
import Section from './Section/Section'

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
            <header>
                <Header />
            </header>
            <section>
                <Section />
            </section>
        </>
    )
})

export default App