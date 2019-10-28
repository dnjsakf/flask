''' CLOUD '''
USERNAME = 'admin'
PASSWORD = 'wjddns1'
DATABASE = 'test'

HOST = 'lab-opf8h.mongodb.net'
OPTIONS = 'retryWrites=true&w=majority'

DB_URL = f'mongodb+srv://{USERNAME}:{PASSWORD}@{HOST}/{DATABASE}?{OPTIONS}'

''' LOCAL '''
PORT = 27017
HOST = f'182.215.67.137:{PORT}'

USERNAME = 'heo'
PASSWORD = 'heo'
DATABASE = 'test'

DB_URL = f'mongodb://{USERNAME}:{PASSWORD}@{HOST}/{DATABASE}?'