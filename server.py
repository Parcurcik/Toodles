import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import asyncio
from config import db_config
from toodles_model.call_model import Toodles
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import bcrypt

app = Flask(__name__)
CORS(app)

toodles_instance = Toodles()

app.config['JWT_SECRET_KEY'] = '20E0DE1D130FE2045E9F77217B23835DDFB30DC0F33C860576FC0D2044D41F42'

jwt = JWTManager(app)


@app.route('/api/question', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000')
def process_data():
    data = request.get_json()
    print(data[0])

    async def process_question():
        result = toodles_instance.make_answer(data)
        return result

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(process_question())

    print(result)
    response_data = {'message': 'Данные успешно обработаны', 'result': result}
    return jsonify(response_data), 200


@app.route('/api/register', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
def register():
    data = request.get_json()
    print(data)

    name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    avatar = data.get('avatar')

    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    try:
        select_query = "SELECT email FROM registration WHERE email = %s"
        cursor.execute(select_query, (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            response_data = {'message': 'Пользователь с такой почтой уже существует'}
            return jsonify(response_data), 400

        hashed_password = hash_password(password)

        insert_query = 'INSERT INTO registration (last_name, first_name, email, avatar, password) VALUES (%s, %s, %s, %s, %s)'
        cursor.execute(insert_query, (last_name, name, email, avatar, hashed_password))
        conn.commit()

        access_token = create_access_token(identity=email)

        print(access_token)

        response_data = {'message': 'Регистрация прошла успешно'}
        return jsonify(response_data), 200
    except psycopg2.Error as e:
        response_data = {'message': 'Ошибка при регистрации'}
        return jsonify(response_data), 500
    finally:
        cursor.close()
        conn.close()

    response_data = {'message': 'Регистрация прошла успешно'}
    return jsonify(response_data), 200


def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password


if __name__ == '__main__':
    app.run(debug=True)
