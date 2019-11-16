from app import app

from flask import jsonify, redirect, request, url_for, make_response
from bson.objectid import ObjectId
from app.database import DB
from app.config.logger import logger

from app.database.pipelines import DataPipe

@app.route('/list', methods=['GET'])
@app.route('/list/<string:comunity>/<string:cate>/<int:page>', methods=['GET'])
def getList( comunity=None, cate=None, page=1 ):

    rowsForPage = int(request.args['rowsForPage'] if 'rowsForPage' in request.args else 10)

    conn = app.config['database']['test']['contents']

    data = list(conn.aggregate([
        { 
            '$addFields': { 
                '_id': { '$toString': '$_id' } 
                , 'no': { '$toInt': '$no' }
                , 'date': { '$toDate': '$load_dttm' }
            }
        }
        , { '$sort': { 'date': -1, 'no': -1 } }
        , { '$limit': rowsForPage }
    ]))

    data = list( data )

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
