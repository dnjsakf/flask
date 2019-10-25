from app import app

from flask import jsonify, redirect, request
from bson.objectid import ObjectId
from app.database import DB

@app.route('/list', methods=['GET'])
@app.route('/list/<int:page>', methods=['GET'])
@DB.connect( database='test' )
def getList( client, page=None ):

    data = DB.select( collection='test', filter={'_id': False} )

    return jsonify( data )

@app.route('/list', methods=['POST'])
@DB.transaction( database='test' )
def insertList( client, session ):

    data = dict(request.form)

    try:
        obj_id = DB.insert(collection='test', data=data)
        print( ObjectId(obj_id.inserted_id) )
    except Exception as e :
        print( e )

    return redirect('/list')

@app.route('/list/trans', methods=['GET'])
@DB.transaction( database='test' )
def test( conn, session ):

    print( conn )

    return 'hi'