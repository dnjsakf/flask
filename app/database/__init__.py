from functools import wraps
from pymongo import MongoClient, errors
from app.config import logger
from bson.objectid import ObjectId

class DB( object ):

    RETRY = 3
    SESSION = None
    CLIENT = None

    @classmethod
    def connect( cls, database=None, retry=RETRY ):

        from app.config import db_conf

        def wrap( func ):
            '''Connection retry...'''
            @wraps( func )
            def connectWrap(*args, **kargs):
                logger.info( 'request connection' )
                for trying in range(1, retry+1):
                    client = MongoClient(db_conf.DB_URL, serverSelectionTimeoutMS=1000)

                    logger.info( 'get client' )

                    try:
                        logger.info( client.server_info() )

                        _client = client[database] if database else client

                        cls.CLIENT = _client

                        logger.info( 'connected!!!' )
                        return func( client, *args, **kargs )

                    except errors.ServerSelectionTimeoutError as err:
                        client = None
                        cls.CLIENT = None

                        logger.info(f' { err } : retry...{ trying }/{ retry }')

                return None

            return connectWrap
        return wrap

    @classmethod
    def transaction( cls, database=None, retry=RETRY ):
        def wrap(func):
            @wraps(func)
            @DB.connect()
            def transactionWrap( client, *args, **kargs ):
                res = None
                session = None
                try:
                    logger.info( 'open-transaction' )
                    session = client.start_session()
                    session.start_transaction()

                    _client = client[database] if database else client

                    cls.SESSION = session
                    cls.CLIENT = _client

                    res = func( client=_client, session=session, *args, **kargs )

                    session.commit_transaction()
                    logger.info( 'commit-transaction' )

                except Exception as err:
                    logger.error( err )
                    if session: 
                        session.abort_transaction() # Rollback
                        logger.info( 'rollback-transaction' )

                finally:
                    cls.destroy()

                    session = None
                    logger.info( 'close-transaction' )
                return res
                
            return transactionWrap
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