from app.database import DB

@DB.connect(database='test')
def select( client ):

    data = DB.select( collection='test', filter={ "_id": False } )

@DB.connect(database='test')
def delete( client, session ):

    data = DB.delete( collection='test', cond={ "title": "1" } )

@DB.connect(database='test')
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

match = {
    'no': 1
}
page = 1
rowsPerPage = 5

from app.config.pipelines import DataMapper

mapper = DataMapper.selectData( match=match, page=page, rowsPerPage=rowsPerPage )
print( mapper )