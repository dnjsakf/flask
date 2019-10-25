from app.database import DB

@DB.transaction(database='test')
def select( client, session ):

    data = DB.select( collection='test', filter={ "_id": False } )

@DB.transaction(database='test')
def delete( client, session ):

    data = DB.delete( collection='test', cond={ "title": "1" } )

select()