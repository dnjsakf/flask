from app import app

from flask import jsonify

@app.route('/list', methods=['GET', 'POST'])
def list_index():

    data = {
        "A": 10
    }
    
    return jsonify( data )