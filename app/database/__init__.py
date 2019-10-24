import pymongo
import logging

from functools import wraps

logger = logging.getLogger('db')
logger.setLevel( logging.INFO )

class DB(object):

    @staticmethod
    def connect( retry=1 ):
        import app.config.database as config

        def wrap( func ):
            '''Connection retry...'''
            @wraps( func )
            def connectWrap(*args, **kargs):
                conn = None
                
                for trying in range(1, retry+1):
                    client = pymongo.MongoClient(config.DB_URL, serverSelectionTimeoutMS=3000)
    
                    try:
                        logger.info( client.server_info() )

                        return func( client[kargs['database']], *args, **kargs )
                    except pymongo.errors.ServerSelectionTimeoutError as err:
                        client = None

                        logger.error(f' { err } : retry...{ trying }/{ retry }')

                return None

            return connectWrap
        return wrap

@DB.connect( retry=5 )
def connect( client=None, database=None, collection=None ):
    #return client.get_database(database).get_collection(collection)
    return client