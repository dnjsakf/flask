from app import app

from flask import jsonify, redirect, request
from bson.objectid import ObjectId
from app.database import DB

from app.config import logger

@app.route('/list', methods=['GET'])
@app.route('/list/<int:page>', methods=['GET'])
@DB.connect( database='test' )
def getList( client, page=None ):

    data = DB.select( collection='test', filter={'_id': False} )

    return jsonify( data )

@app.route('/list', methods=['POST'])
@DB.connect( database='test' )
def insertList( client ):
    logger.info('insert')
    try:
        data = dict( request.json )

        obj_id = DB.insert(collection='test', data=data)
    except Exception as error :
        logger.error( error )

    return redirect('/list')

