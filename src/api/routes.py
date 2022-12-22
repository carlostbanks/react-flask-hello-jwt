"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not email:
            return "Email is required", 401
        if not password:
            return "Password is required", 401
        
        email_query = User.query.filter_by(email=email).first()
        if email_query:
            return "This email already exists", 401
        
        user = User()
        user.email = email
        user.password = password
        user.is_active = True
        print(user)
        db.session.add(user)
        db.session.commit()

        response = {
            "msg": "User added successfully",
            "email": email
        }
        return jsonify(response), 200


@api.route("users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(map(lambda index: index.serialize(), users))
    response_body = {
        "users": users
    }
    return jsonify(response_body), 200