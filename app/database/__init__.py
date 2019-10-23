import pymongo
import logging

from functools import wraps

logger = logging.getLogger('db')
logger.setLevel( logging.INFO )

class DB:
    def connect( retry=1 ):
        import app.config.database as config

        def wrap( func ):
            '''Connection retry...'''
            @wraps( func )
            def connectWrap(*args, **kargs):
                conn = None
                
                for trying in range(1, retry+1):
                    conn = pymongo.MongoClient( config.DB_HOST, config.DB_PORT, serverSelectionTimeoutMS=1 )

                    try:
                        logger.info( conn.server_info() )
                        logger.info( 'hi' )

                        return func( conn, *args, **kargs )
                    except pymongo.errors.ServerSelectionTimeoutError as err:
                        conn = None

                        logger.error(f' { err } : retry...{ trying }/{ retry }')

                return None

            return connectWrap
        return wrap

@DB.connect( retry=30 )
def connect( conn, database, collection ):
    return conn.get_database(database).get_collection(collection)