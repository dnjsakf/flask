from app.config.logger import logger

class Common( object ):

    @staticmethod
    def pagination( pipe=None, **kargs ):

        page = kargs['page'] if 'page' in kargs else 1
        rowsPerPage = kargs['rowsPerPage'] if 'rowsPerPage' in kargs else 10

        if isinstance(pipe, (list)):
            startPage = ( rowsPerPage * ( page - 1 ) )

            return pipe.extend([
                { '$skip': startPage },
                { '$limit': rowsPerPage }
            ])
        else:
            return pipe

    @staticmethod
    def sortting( pipe=None, **sort ):
        if sort and isinstance(pipe, (list)):
            return pipe.append( sort )
        else:
            return pipe

