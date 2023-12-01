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


api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt): ## Agregue el salt como parametro
    return check_password_hash(hash_password, f"{password}{salt}")
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
def signup(): #Capaz poner un nombre mas intuitivo
    body = request.json
    name = body.get("name")
    last_name = body.get("last_name")
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")

    if username is None or email is None or password is None:
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


@api.route('login',methods=['POST'])

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
            
@api.route ('user/favorites/int:theid', methods=['GET'])
def get_user_favorites(theid=None):
    if theid is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    favorites = Favorites.query.get.filter_by(user_id=theid).all()
    if favorites is None:
        return jsonify({"Message":"This user has no favorites"})
    favorites_list = []
    for item in favorites:
        favorites_list.append(item.serialize())
    return jsonify(favorites_list), 200

@api.route ('favorites/user/<int:user_added>/<int:user_id>', methods=['POST'])
def add_favorites_users(user_added, user_id):
    favorites = Favorites.query.filter_by(user_id = user_added, user_id = user_id).first()

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"Message":"This user does not exist"}), 404
    
    if favorites is not None:
        return jsonify({"Message":"This favorite alredy exist"}), 
# Buscar que error va aqui

    add_favorite = Favorites(user_id = user_id, user_added = user_id)
    db.sessions.add(add_favorite)

    try:
        db.session.commit()
        return  jsonify({"Message":"The favorite was added"}), 200
# aqui seria 200 o 201?
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500

api.route ('favorites/user/<int:user_added>/<int:user_id>', methods=['DELETE'])
def delete_favorite(user_added, user_id):
    favorite = Favorites.query.filter_by(user_id=user_id, user_id=user_added).first()

    if favorite is None:
        return jsonify({"Message":"This favorite does not exist"}), 404
    
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"Message":"This favorite was deleted"})
    except Exception as error:
        db.session.rollback()
        return jsonify({"Message":f"{error}"}), 500


