FROM python:3.10

ENV FLASK_RUN_PORT=5000

COPY . /app

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN git clone https://huggingface.co/Parcurcik/toodles_essays /app/server/toodles_model

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "server.py"]
