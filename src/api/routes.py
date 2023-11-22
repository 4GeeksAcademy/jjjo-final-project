"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os


api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password):
    return check_password_hash(hash_password, password)
# Allow CORS requests to this API
CORS(api)


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
def signup():
    body = request.json
    name = body.get("name")
    last_name = body.get("last_name")
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")
    is_active = body.get("is_active")

    if username is None or email is None or password is None:
        return jsonify({"Message":"Se deben llenar todos los datos para continuar"}), 400
    
    check_username = User.query.filter_by(username = username).first()

    if check_username is not None:
        return jsonify({"Message":"Este nombre de usurio ya esta en uso"}), 400
    
    check_email =  User.query.filter_by(email=email).first()

    if check_email is not None:
        return jsonify({"Message":"Esta direccion de correo ya esta en uso"}), 400
    
    # Aqui va el hasheo de la contraseña (No he importado la libreria aun)
    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = set_password(password, salt)
    
    new_user = User(username = username, email = email, password = password, is_active = is_active, name = name, last_name = last_name, salt = salt)


    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"Message":"Usurio creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500

