from app import app

from flask import jsonify, redirect, request, url_for, make_response
from bson.objectid import ObjectId
from app.database import DB
from app.config.logger import logger

from app.database.pipelines import DataPipe

@app.route('/list', methods=['GET'])
@app.route('/list/<int:page>', methods=['GET'])
def getList( page=1 ):
    conn = app.config['database']['test']['ygosu']

    cate = request.args.get('cate')

    pipeline = DataPipe.selectData( cate=cate, page=page, sort={ 'no': -1 } )
    data = list( conn.aggregate(pipeline=pipeline) )

    return jsonify( data )

@app.route('/list', methods=['POST'])
def insertList():
    logger.info('insert')
    try:
        data = dict( request.json )

        obj_id = DB.insert(collection='test', data=data)
    except Exception as error :
        logger.error( error )

    return jsonify({
        'method': 'get'
        , 'url': 'http://localhost:3000/list'
    })


@app.route('/list/<string:category>', methods=['GET'])
def getCateList( category=None ):

    data = DB.select( collection='test', filter={'_id': False} )

    return jsonify( data )