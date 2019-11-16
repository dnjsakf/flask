import React, { memo, useState, useEffect, useCallback, useRef } from 'react';

import { HashItem } from './../Items'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const HASH_MAX_LENGTH = 5;

const HashSearchWrapper = memo(({ onSearch })=>{
    const classes = useStyles();
    const refHash = useRef();
    
    const [ hashList, setHashList ] = useState([]);

    const handleDelete = useCallback(( delHashId )=>{
        setHashList(( prevHashList )=>( 
            prevHashList.filter((hash)=>( hash !== delHashId ))
         ));
    }, [ hashList ]);

    const handleSubmit = useCallback(( event )=>{
        if( event.keyCode === 13 ){
            const searchHash = refHash.current.value;
            if ( searchHash && hashList.length < HASH_MAX_LENGTH ){
                setHashList(( prevHashList )=>( 
                    prevHashList.filter((hash)=>( hash !== searchHash )).concat([ searchHash ])
                ));
            }
            refHash.current.value = '';
        }
    }, [ hashList ]);

    useEffect(()=>{
        onSearch( hashList );
    }, [ hashList ]);

    return (
        <>
            <TextField
                id="add_hash"
                className={ classes.textField }
                label="saerch"
                margin="normal"
                name="add_hash"
                inputProps={{ 
                    ref: refHash 
                    , maxLength: 10
                }}
                onKeyDown={ handleSubmit } 
            />
            <div>
            {
                hashList.map((hash)=>(
                    <HashItem key={ hash } hash={ hash } onDelete={ handleDelete }/>
                ))
            }
            </div>
        </>
    );
})

export default HashSearchWrapper;