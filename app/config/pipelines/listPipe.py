from app.config.logger import logger
from app.utils.common import Common

class DataMapper( object ):

    @staticmethod
    def selectData( *args, **kargs ):

        pipe = list()

        pipe.extend([
            { # SELECT
                '$project': {
                    'no': 1
                    , 'title': 1
                    , 'author': -1
                }
            },
            { # Add Fields
                '$addFields': { 
                    '_id': { '$toString': '$_id' }
                }
            }
        ])

        Common.pagination( pipe, **page)
        Common.sortting( pipe, **sort)

        return pipe