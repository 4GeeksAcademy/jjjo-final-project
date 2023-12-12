"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Subject, Favorites_subject
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import json 
import smtplib 
import smtplib , ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import cloudinary.uploader as uploader 


api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt): ## Agregue el salt como parametro
    return check_password_hash(hash_password, f"{password}{salt}")
# Allow CORS requests to this API
CORS(api)

user_path = os.path.join(os.path.dirname(__file__), "users.json") ##ruta 
subject_path = os.path.join(os.path.dirname(__file__), "subject.json") ##ruta 

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/users', methods=['GET'])
# def get_users_list():
#     users = User.query.all()
#     user_list = []
#     for item in users:
#         user_list.append(item.serialize())
#     return jsonify(user_list), 200 

# Endpoint para traer la informacion de un usuario en linea
@api.route ('/user', methods=['GET'])
@jwt_required()
def get_user():
    id = get_jwt_identity()["user_id"]
    user = User.query.get(id)
    print(user)
    # user = user.query.get(id)
    if user is None:
        return ({"message": "user doesn't exist"})
    return jsonify((user.serialize())), 200

### Endpoint para crear un usuario 
@api.route('/signup', methods=['POST'])
def signup(): #Capaz poner un nombre mas intuitivo
    body = request.json
    name = body.get("name")
    last_name = body.get("last_name")
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")
    description = body.get("description")


    if username is None or email is None or password is None or name is None or last_name is None:
        return jsonify({"Message":"Se deben llenar todos los datos para continuar"}), 400
    
    check_username = User.query.filter_by(username = username).first()

    if check_username is not None:
        return jsonify({"Message":"Este nombre de usuario ya esta en uso"}), 400
    
    check_email =  User.query.filter_by(email=email).first()

    if check_email is not None:
        return jsonify({"Message":"Esta dirección de correo ya esta en uso"}), 400
    
    # Aqui va el hasheo de la contraseña (No he importado la libreria aun)
    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = set_password(password, salt)
    
    new_user = User(username = username, email = email, password = password, name = name, last_name = last_name, salt = salt)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"Message":"usuario creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500


@api.route('/login',methods=['POST'])

## Endpoint para ingresar un usuario (crea un token)
def login(): #Capaz poner un nombre mas intuitivo
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return jsonify({"Message":"Se deben llenar todos los datos para continuar"}), 400
    else:
        user = User.query.filter_by(email=email).one_or_none()
        if user is None:
            return jsonify({"Message":"El usuario no existe"}), 400
        else:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity={"user_id":user.id})
                return jsonify({"token":token}), 200
            else:
                return jsonify({"Message":"Datos incorrectos"}), 400
            
            
# Un metodo get para comprobar que los favoritos del usuario se estan creando
@api.route ('user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    student_id = get_jwt_identity()["user_id"]
    print(student_id)
    if student_id is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    favorites = Favorites.query.filter_by(student_id=student_id).all()

    if favorites is None:
        return jsonify({"Message":"This user has no favorites"}), 404
    
    favorites_list = []

    for item in favorites:
        favorites_list.append(item.serialize())
    return jsonify(favorites_list), 200




# End point para crear favoritos
@api.route ('favorites/user/<int:instructor_id>', methods=['POST'])
@jwt_required()
def add_favorites_users(instructor_id):
    student_id = get_jwt_identity()["user_id"]
    favorites = Favorites.query.filter_by(instructor_id = instructor_id, student_id = student_id).first()

    user = User.query.get(instructor_id)
    if user is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    if favorites is not None:
        return jsonify({"Message":"This favorite alredy exist"}), 400

    add_favorite = Favorites(student_id = student_id, instructor_id = instructor_id)
    db.session.add(add_favorite)

    try:
        db.session.commit()
        return  jsonify({"Message":"The favorite was added"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500


# End point para borrar favoritos creados
@api.route ('favorites/<int:instructor_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(instructor_id):
    student_id = get_jwt_identity()["user_id"]
    favorite = Favorites.query.filter_by(student_id=student_id, instructor_id=instructor_id).first()

    if favorite is None:
        return jsonify({"Message":"This favorite does not exist"}), 404
    
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"Message":"This favorite was deleted"}), 200
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500

### Endpoint para modificar la información de un usuario
@api.route('/user',methods=['PUT'])
@jwt_required()
def update_user():

    ## Buscamos el usuario que queremos actualizar
    user_id = get_jwt_identity()["user_id"] ## Usuario a editar

    ## Obtener la informacion del body
    data = request.json

    name = data.get("name")
    lastname = data.get("last_name")
    username = data.get("username",None)
    email = data.get("email",None)
    password = data.get("password",None)
    description = data.get("description",None)
    rol = data.get("rol",None)

    #name = name.strip()

    # Creamos una instancia del usuario

    user = User.query.get(user_id)

    #Verificamos que los campos no sean nulos y que no sean un string vacio
    #Pendiente verificar por ejemplo que los campos no sea un string con uno o mas espacios! (Listo)
  
    if name is not None and name != "" and name.isspace() == False: 
        user.name = name
    if lastname is not None and lastname != "" and lastname.isspace() == False: 
        user.last_name = lastname
    if username is not None and username != "" and username.isspace() == False: 
        user.username = username
    if email is not None and email != "" and email.isspace() == False:
        user.email = email
    if description is not None and description !=""  and description.isspace() == False:
        user.description = description
    if rol is not None and rol != "" and rol.isspace() == False:
        user.rol = rol

    ## Contraseña nueva con hash y salt
    if password is not None and password != "" and  password.isspace() == False:
        user.password = set_password(password, user.salt)

    try:
        db.session.commit()
        return jsonify({"message": "usuario actualizado"})
    except Exception as error:
        db.session.rollback()
        return error 
    
    
#### Endpoints para crear datos en nuestras tablas    


###Endpoint para crear usuarios en la base de datos (users)
@api.route("/user-population", methods=["GET"])
def user_population():
    with open(user_path, "r") as file:
        data = json.load(file)
        file.close
        for user in data:
            salt = b64encode(os.urandom(32)).decode("utf-8")
            password = set_password(user["password"], salt)
            user = User(
                name=user["name"],
                last_name=user["last_name"],
                username=user["username"],
                email=user["email"],
                description = user["description"],
                rol = user["rol"],
                
                password=password,
                salt=salt,
            )
            db.session.add(user)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("todo fallo"), 500
        
    return jsonify("todo funciono"), 200

###Endpoint para crear materias en la base de datos (subjects)
@api.route("/subject-population", methods=["GET"])
def subject_population():
    with open(subject_path, "r") as file:
        data = json.load(file)
        file.close
        for subject in data:
            subject = Subject(
                name=subject["name"],
                description=subject["description"],
            )
            db.session.add(subject)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("todo fallo"), 500
        
    return jsonify("todo funciono"), 200

# Endpoint para traer los profesores a la vista de materias
@api.route ('/subject/<int:subject_id>', methods=['GET'])
def get_teachers(subject_id):
    subject = Favorites_subject()
    subject = subject.query.filter_by(subject_id = subject_id).all()
    return jsonify(list(map(lambda item : item.serialize(), subject))), 200

#Variables y funcion para enviar emails

# Protocolo y puerto
smtp_address = os.getenv("SMTP_ADDRESS")
smtp_port = os.getenv("SMTP_PORT")

# Datos de nuestra app
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")

# Función para enviar un correo con un asunto, a un destinatario con un "body" predeterminado
def email_function(subject, recipient, body):
    # Asunto del correo (El \n es una salto de linea  de la libreria. Lo usamos para poder integrar mas parametros)
    # Ese reply acalara en el apartado para mi de gmail
    # message = f"Subject: {subject}\nReply-To: {recipient}\nFrom: {recipient}\nTo:{recipient}\n{message}"
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = email_address
    message["To"] = recipient
    html = '''
        <html>
        <body>
        <div>
        <p>
        Estás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta
        </p>
        ''' + body + '''   
        <p>
        -TuMentorEnLinea
        </p>
        </div>
        </body>
        </html>
    '''
    html_mime = MIMEText(html, 'html')
    #adjuntamos el código html al mensaje
    message.attach(html_mime)
    try:
        # server = smtplib.SMTP(smtp_address, smtp_port)
        # server.starttls()
        # server.login("tumentorenlinea1@gmail.com", "ytirjlqnjrmnylyk")
        # # (1er parametro es el email que envia, 2do parametro email que lo recibe y 3er parametro es el mensaje)
        # message = message.encode('utf-8')
        # server.sendmail(email_address,recipient, message)
        # server.quit()
        # print ("Se envio el mensage")
        # return True
        print("me ejecuto en el endpoint en enviar mensaje")
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, recipient, message.as_string())
            print("me ejecuto")
        return True
    
    except Exception as error:
        print(error.args)
        print("aqui entra el error")
        return False
  
# Endpoint para mandar un correo al usuario introducido en el body  
@api.route("/sendemail", methods=["POST"])
def send_email():
    body = request.json
    result = email_function(body.get('subject'), body.get("to"), body.get("message"))
    print("Entre en el endpoint")
    print(result)
    if result == True:
        return jsonify("Email sent"), 200
    
    else:
        return jsonify("There was an error. The email was not sent"), 500

# Endpoint para agregar materias a enseñar

@api.route ('subjects/<int:subject_id>', methods=['POST'])
@jwt_required()
def add_favorites_subjects(subject_id):
    user_id = get_jwt_identity()["user_id"]
    subjects = Favorites_subject.query.filter_by(subject_id = subject_id, user_id = user_id).first()

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    if subjects is not None:
        return jsonify({"Message":"You already teach this subject"}), 400

    add_subject = Favorites_subject(subject_id = subject_id, user_id = user_id)
    db.session.add(add_subject)

    try:
        db.session.commit()
        return  jsonify({"Message":"The subject was added"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500
    

# Un metodo get para traer las materias que los usuarios desean enseñar
@api.route ('subjects/subjects', methods=['GET'])
@jwt_required()
def get_user_subjects():
    user_id = get_jwt_identity()["user_id"]
    print(user_id)
    if user_id is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    subjects = Favorites_subject.query.filter_by(user_id=user_id).all()

    if subjects is None:
        return jsonify({"Message":"This user teaches no subjects"}), 404
    
    subject_list = []

    for item in subjects:
        subject_list.append(item.serialize())
    return jsonify(subject_list), 200

    # End point para borrar materias que no se desean enseñar
@api.route ('subjects/<int:subject_id>', methods=['DELETE'])
@jwt_required()
def delete_subject(subject_id):
    user_id = get_jwt_identity()["user_id"]
    subject = Favorites_subject.query.filter_by(subject_id = subject_id, user_id = user_id).first()

    if subject is None:
        return jsonify({"Message":"This subject does not exist"}), 404
    
    try:
        db.session.delete(subject)
        db.session.commit()
        return jsonify({"Message":"You no longer teach this subject"}), 200
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500

#End point para traer las materias a la vista privada de profesores

@api.route ('subjects/all', methods=['GET'])
def get_subjects():
    subject = Subject()
    subject = subject.query.all()
    return jsonify(list(map(lambda item : item.serialize(), subject))), 200
