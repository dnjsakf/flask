from pprint import pprint
from app.database import DB

def tester( client ):
    from bson.objectid import ObjectId

    pipe = [
        {   # WHERE
            '$match': {
                'author': '3'
            }
        },
        {   # SELECT
            '$project': {
                'no': 1
                , 'title': 1
                , 'author': -1
            }
        },
        {   # Add Fields
            '$addFields': { 
                '_id': { '$toString': '$_id' } 
            }
        },
        { '$skip': 0 },
        { '$limit': 20 },
        { '$sort': { 
            'no': -1 
            } 
        }
    ]

    cursor = client.test.test.aggregate( pipeline=pipe )

    from pprint import pprint

    print( cursor )

# tester()

DB.connect( retry=5 )

@DB.transaction( 'test' )
def getDataList( client, session ):
    data = client.test.aggregate()

    pprint( list(data) )

getDataList( pipeline='insertGetData' )