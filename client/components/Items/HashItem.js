import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    fab: {
        margin: theme.spacing(2),
    },
    small_icon: {
        fontSize: '14px'
    }
}));

const HashItem = memo(({ hash, onDelete })=>{
    const classes = useStyles();
    return (
        <>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={()=>{ onDelete( hash ) }} className={ classes.small_icon }>
                    <a>#{ hash }</a>
                    <DeleteIcon className={ classes.small_icon }/>
                </IconButton>
            </Tooltip>
        </>
    );
});

export default HashItem;