FROM python:3.10

ENV FLASK_RUN_PORT=5000

COPY . /app

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "server.py"]
