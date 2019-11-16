import React, { memo, useState, useEffect, useCallback, useRef } from 'react';

import { InfinityItem } from './../Items'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    'infinity_wrapper': {
        'width': '100%',
    },
}));

const InfinityWrapper = ({ contents })=>{
    const classes = useStyles();
    return (
        <List className={ classes.infinity_wrapper }>
        { 
            contents
            ? contents.map(( data )=>(
                <React.Fragment key={ data._id } >
                    <InfinityItem data={ data }/>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))
            : [] 
        }
        </List>
    );
}

export default InfinityWrapper;