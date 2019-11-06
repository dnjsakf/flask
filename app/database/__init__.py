from pprint import pprint
from functools import wraps
from pymongo import MongoClient, errors
from bson.objectid import ObjectId

from app.config import logger, MongoConf

class DB(object):

    RETRY = 5
    SESSION = None
    CLIENT = None

    @classmethod
    def connect( cls, retry=RETRY ):
        logger.info( 'Start connection...' )
        
        client = None

        try:
            for trying in range(1, retry+1):
                client = MongoClient( MongoConf.URL )
                try:
                    info = client.server_info()
                    logger.info( info )
                    break
                except errors.ServerSelectionTimeoutError as error:
                    logger.info(f' { error } : retry...{ trying }/{ retry }')

        except Exception as error:
            client = None
            logger.error( error )

        finally:
            cls.CLIENT = client

        logger.info( 'End connection!!!' )

        return client

    @classmethod
    def transaction( cls, database=None ):
        logger.info( 'Start transaction...' )
        def wrap( func ):
            @wraps( func )
            def transWrap( pipeline=None ):
                if cls.CLIENT != None and pipeline != None:
                    logger.info( pipeline )
                    '''
                        Setting pipeline
                    '''
                    session = cls.CLIENT.start_session()

                    res = None
                    try:
                        session.start_transaction()

                        res = func( client=cls.CLIENT[database], session=session )

                        session.commit_transaction()
                    except Exception as error:
                        session.abort_transaction()
                        logger.error( error )

                    return res
                else:
                    return func( client=None, session=None )
            return transWrap
        return wrap

    @classmethod
    def select( cls, collection=None, cond=None, filter=None, retry=RETRY ):
        res = None
        try:
            res = list( cls.CLIENT[collection].find(cond, filter, session=cls.SESSION ) )

            cls.CLIENT[collection].aggregate( pipeline=pipe )

            logger.info( f'selected!!! length: { len( res ) }' )
        except Exception as error:
            logger.error( error )

        return res

    @classmethod
    def insert( cls, collection=None, data={}, retry=RETRY ):
        res = None
        try:
            res = cls.CLIENT[collection].insert_one( data, session=cls.SESSION )

            logger.info( f'inserted!!! ObjectId: { ObjectId(res.inserted_id) }' )
        except Exception as error:
            logger.error( error )

        return res

    @classmethod
    def delete( cls, collection=None, cond={}, retry=RETRY ):
        return cls.CLIENT[collection].remove( cond )

    @classmethod
    def update( cls, collection=None, cond={}, retry=RETRY ):
        return cls.CLIENT[collection].update(cond, session=cls.SESSION )

    @classmethod
    def destroy( cls ):
        cls.CLIENT = None
        cls.SESSION = None

