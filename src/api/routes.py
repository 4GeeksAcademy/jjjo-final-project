"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Subject
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
            
            
# Un metodo get para comprobar que los favoritos del usurio se estan creando
@api.route ('user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    student_id = get_jwt_identity()["user_id"]
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
api.route ('favorites/user/<int:instructor_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(instructor_id, student_id):
    student_id = get_jwt_identity()["user_id"]
    favorite = Favorites.query.filter_by(student_id=student_id, user_id=instructor_id).first()

    if favorite is None:
        return jsonify({"Message":"This favorite does not exist"}), 404
    
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"Message":"This favorite was deleted"})
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500
    

###Endpoint to populate the DB (users)
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

###Endpoint to populate the DB (subjects)
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

#Variables y funcion para enviar emails

# Protocolo y puerto
smtp_address = os.getenv("SMTP_ADDRESS")
smtp_port = os.getenv("SMTP_PORT")

# Datos de nuestra app
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")


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
        # server.login("email_address", "email_password")
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

