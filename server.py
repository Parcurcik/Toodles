from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import asyncio
from toodles_model.call_model import Toodles

app = Flask(__name__)
CORS(app)

toodles_instance = Toodles()

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


if __name__ == '__main__':
    app.run(debug=True)
