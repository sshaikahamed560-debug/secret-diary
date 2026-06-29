from models import db
from datetime import datetime

class Memory(db.Model):
    __tablename__ = "memory"

    id = db.Column(db.Integer, primary_key=True)

    image = db.Column(db.String(255), nullable=False)

    caption = db.Column(db.String(300))

    created = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )