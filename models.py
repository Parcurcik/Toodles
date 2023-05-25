from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'registration'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    avatar = db.Column(db.String(100))
    password = db.Column(db.String(200))

    def __init__(self, name, last_name, email, avatar, password):
        self.name = name
        self.last_name = last_name
        self.email = email
        self.avatar = avatar
        self.password = password
