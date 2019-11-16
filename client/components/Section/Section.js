import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSelect } from './../../reducers/crud'

import { HashSearchWrapper, InfinityWrapper } from './../Wrappers'

const useScroll = ()=>{
    const [ position, setPosition ] = useState({
        x: 0
        , y: 0
    });
    
    const onScroll = ()=>{
        setPosition({
            y: window.scrollY
            , x: window.scrollX
        });
    }

    useEffect(()=>{
        window.addEventListener('scroll', onScroll);
        return ()=>( window.removeEventListener('scroll', onScroll) );
    }, [ ]);

    return position;
}

const Section = ()=>{
    const [ rowsForPage, setRowsForPage ] = useState(15, []);
    const { contents, status } = useSelector(({ crud })=>({
        contents: crud.data
        , status: crud.status
    }), [ ]);

    const { y } = useScroll();

    const dispatch = useDispatch();
    const handleSearch = useCallback(( hashList )=>{
        dispatch( actionSelect({
            method: 'get'
            , url: 'http://localhost:3000/list?rowsForPage='+rowsForPage
        }));
    }, [ rowsForPage ]);

    useEffect(()=>{
        console.log( contents );
    }, [ contents, status ]);

    useEffect(()=>{
        console.log( y+document.documentElement.offsetHeight >= document.body.scrollHeight, y+document.documentElement.offsetHeight, document.body.scrollHeight, window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight, document.documentElement.clientHeight )
        if( y+document.documentElement.offsetHeight >= document.body.scrollHeight ){
            setRowsForPage((prev)=>( prev+5 ))
        }
    },[ y ]);

    useEffect(()=>{
        console.log( rowsForPage )
        handleSearch();
    }, [ rowsForPage ]);

    return (
        <>
            <HashSearchWrapper onSearch={ handleSearch } />
            <InfinityWrapper contents={ contents }/>
            {
                status !== 200 && <a>loadding...</a>
            }
        </>
    );
}

export default Section;