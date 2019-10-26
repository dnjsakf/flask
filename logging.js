const logger = require('./client/config/logger');

logger.info( `asdfsdf
asdf

` );

logger.info({'asdf':'asdf'})

try{
    throw( new Error('asdf') )
}
catch ( error ){
    logger.error( error );
}