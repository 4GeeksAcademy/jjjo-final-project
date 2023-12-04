"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import json 

api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt): ## Agregue el salt como parametro
    return check_password_hash(hash_password, f"{password}{salt}")
# Allow CORS requests to this API
CORS(api)

user_path = os.path.join(os.path.dirname(__file__), "users.json") ##ruta 

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

###Endpoint to populate the DB


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
                password=password,
                salt=salt,
            )
            db.session.add(user)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("rodo fallo"), 500
        
    return jsonify("todo funciono"), 200


