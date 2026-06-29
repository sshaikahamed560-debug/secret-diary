from models import db

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(50), nullable=False)

    pin = db.Column(db.String(4), nullable=False)

    profile = db.Column(db.String(150), default="profile.png")