import logging
import logging.config
import json

with open('./app/config/logger.conf.json', 'rt') as f:
    config = json.load( f )
    logging.config.dictConfig( config )

logger = logging.getLogger('API_LOG')

''' Setting load JSON '''

''' Setting in file
logger = logging.getLogger( 'heo-logger' )
logger.setLevel( logging.INFO )

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

stream_hander = logging.StreamHandler()
file_handler = logging.FileHandler( os.path.join( os.path.dirname(__file__), './../../logs/app.log' ) )

stream_hander.setFormatter(formatter)
file_handler.setFormatter(formatter)

logger.addHandler( stream_hander )
logger.addHandler( file_handler )
'''