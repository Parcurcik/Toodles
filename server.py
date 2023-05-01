from quart import Quart, request, jsonify
from quart_cors import cors, route_cors
from toodles_model.call_model import Toodles

app = Quart(__name__)
app = cors(app, allow_origin="*")

toodles_instance = Toodles()


@app.route('/api/question', methods=['POST', 'OPTIONS'])
@route_cors(allow_origin="*")
async def process_data():
    data = await request.get_json()
    print(data[0])
    result = toodles_instance.make_answer(data)
    print(result)
    response_data = {'message': 'Данные успешно обработаны', 'result': result}
    return jsonify(response_data), 200


if __name__ == '__main__':
    app.run(debug=True)
