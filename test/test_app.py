import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
import pytest

from server import app


@pytest.mark.asyncio

async def test_process_data():
    async with app.test_client() as client:
        data = ['Привет.']
        response = await client.post('http://127.0.0.1:5000/api/question', json=data)
        assert response.status_code == 200
        response_data = await response.get_json()
        assert 'message' in response_data
        assert 'result' in response_data


@pytest.mark.asyncio
async def test_multiprocessing_backend():
    async with app.test_client() as client:
        data = ['Напиши отзыв на ноутбук HP.']
        tasks = [asyncio.create_task(client.post('http://127.0.0.1:5000/api/question', json=data)) for _ in range(50)]
        responses = await asyncio.gather(*tasks)

        for response in responses:
            assert response.status_code == 200
            response_data = await response.get_json()
            assert 'message' in response_data
            assert 'result' in response_data



