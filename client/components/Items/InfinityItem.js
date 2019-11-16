import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    'inline': {
        'display': 'inline',
    },
    'avatar_text': {
        'margin-right': '10px'
    },
    'infinity_item': {
        'backgroundColor': theme.palette.background.paper,
    }
}));

const InfinityItem = memo(({ data })=>{
    const classes = useStyles();
    return (
      <>
        <ListItem className={ classes.infinity_item } alignItems="flex-start">
            <ListItemAvatar className={ classes.avatar_text }>
                <a>{ data.community }</a>
            </ListItemAvatar>
            <ListItemText
                primary={ <Link href={ data.link }>{ data.subject }</Link> }
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={ classes.inline }
                        color="textPrimary"
                    >
                        { data.author }
                    </Typography>
                    { " - "+data.load_dttm }
                    </React.Fragment>
                }
            />
        </ListItem>
      </>
    );
});

export default InfinityItem;