from app.database import connect


conn = connect( database='heoapi', collection='temp' )

print( conn )