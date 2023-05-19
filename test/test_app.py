import json
import unittest
from flask_testing import TestCase
from server import app


class AppTestCase(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        return app

    def test_process_data(self):
        data = ['Привет.']
        response = self.client.post('/api/question', json=data)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data)
        self.assertIn('message', response_data)
        self.assertIn('result', response_data)

    def test_multiprocessing_backend(self):
        data = ['Напиши отзыв на ноутбук HP.']
        for _ in range(50):
            response = self.client.post('/api/question', json=data)
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.data)
            self.assertIn('message', response_data)
            self.assertIn('result', response_data)


if __name__ == '__main__':
    unittest.main()
