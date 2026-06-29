from models import db
from datetime import datetime

class Gallery(db.Model):
    __tablename__ = "gallery"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(
        db.String(250),
        nullable=False
    )

    caption = db.Column(
        db.String(250)
    )

    uploaded = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    favorite = db.Column(
        db.Boolean,
        default=False
    )

    likes = db.Column(
        db.Integer,
        default=0
    )