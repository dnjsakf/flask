import os
import dotenv
from flask import Flask
from flask_cors import CORS

app = Flask(__name__, root_path='', static_folder='/static', template_folder='app/templates')

from app.routes import route_index, route_list

def createApp(env='dev'):
    envConfFile = os.path.join(os.path.dirname(__file__), 'config', '.env')
    envConf = dotenv.load_dotenv( dotenv_path=envConfFile )
    app.config.from_object( envConf )

    pyConfFile = os.path.join(os.path.dirname(__file__), 'config', f'env.{env}.py')
    app.config.from_pyfile( pyConfFile )

    if 'CORS' in app.config:
        CORS(app=app, resources=app.config['CORS'])

    return app