from app import app

from flask import jsonify, render_template, make_response

@app.route('/', methods=['GET', 'POST'])
def main_index():

    data = {
        "A": 10
    }
    
    return render_template('react.html')