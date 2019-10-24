from app import app

from flask import jsonify, redirect, request

@app.route('/list', methods=['GET'])
def getList():

    db = app.config['db']

    data = db.test.find(
        {   # Conditions, optional

        },
        {   # Filters, optional
            "_id": False 
        })

    return jsonify( list(data) )

@app.route('/list', methods=['POST'])
def insertList():

    data = dict(request.form)

    db = app.config['db']
    db.test.insert_one( data )

    return redirect('/list')