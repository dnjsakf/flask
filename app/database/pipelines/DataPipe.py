from app.config.logger import logger
from app.utils.common import Common

class DataPipe( object ):

    @staticmethod
    def selectData( *args, **kargs ):

        pipe = list()

        # 1. Set Conditions
        match = dict()
        if 'cate' in kargs:
            match['cate'] = kargs['cate']

        pipe.append({ '$match': match })

        # 2. Set field selection
        pipe.append({
            '$project': {
                '_id': 0
                , 'no': 1
                , 'tit': 1
                , 'name': 1
                , 'href': 1
                , 'load_dttm': 1
            }
        })
        pipe.append({
            '$addFields': {
                '_id': { '$toString': '$_id' }
            }
        })

        # 3. Set Sorting
        sort = None
        if 'sort' in kargs:
            sort = kargs['sort']
            pipe.append({'$sort': sort})

        # 4. Set pagination
        skip, limit = None, None
        if 'page' in kargs:
            page = kargs['page']
            rowsPerPage = kargs['rowsPerPage'] if 'rowsPerPage' in kargs else 10

            startRow = ( page - 1 ) * rowsPerPage

            pipe.append({ '$skip': startRow })
            pipe.append({ '$limit': rowsPerPage })

        return pipe