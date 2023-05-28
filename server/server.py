from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
import asyncio
from toodles_model.call_model import Toodles
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User
from werkzeug.security import check_password_hash, generate_password_hash
from config import Config

app = Flask(__name__)
CORS(app)

toodles_instance = Toodles()

app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)


@app.route('/api/question', methods=['POST', 'OPTIONS'])
@cross_origin()
def process_data():
    data = request.get_json()

    async def process_question():
        result = toodles_instance.make_answer(data)
        return result

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(process_question())

    response_data = {'message': 'Данные успешно обработаны', 'result': result}
    return jsonify(response_data), 200


@app.route('/api/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()

    name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    avatar = data.get('avatar')

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        response_data = {'message': 'Пользователь с такой почтой уже существует'}
        return jsonify(response_data), 400

    hashed_password = generate_password_hash(password)

    new_user = User(name=name, last_name=last_name, email=email, avatar=avatar, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=email)

    response_data = {'message': 'Регистрация прошла успешно', 'access_token': access_token}
    return jsonify(response_data), 200


@app.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user:
        response_data = {'message': 'Пользователь с такой почтой не найден'}
        return jsonify(response_data), 400

    if not check_password_hash(user.password, password):
        response_data = {'message': 'Неверный пароль'}
        return jsonify(response_data), 400

    access_token = create_access_token(identity=email)

    response_data = {'message': 'Аутентификация прошла успешно', 'access_token': access_token}
    return jsonify(response_data), 200


@app.route('/api/user', methods=['GET'])
@jwt_required()
@cross_origin()
def get_user():
    current_user = get_jwt_identity()

    user = User.query.filter_by(email=current_user).first()

    if not user:
        response_data = {'message': 'Пользователь не найден'}
        return jsonify(response_data), 404

    response_data = {
        'firstName': user.name,
        'lastName': user.last_name,
        'avatar': user.avatar
    }

    return jsonify(response_data), 200


if __name__ == '__main__':
    app.run(debug=True)
