from app.database import DB

@DB.connect(database='test')
def select( client ):

    data = DB.select( collection='test', filter={ "_id": False } )

@DB.connect(database='test')
def delete( client, session ):

    data = DB.delete( collection='test', cond={ "title": "1" } )

select()