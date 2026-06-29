from flask import Flask, render_template, request, jsonify, redirect, url_for
from config import Config
from models import db
from models.diary import Diary
from models.memory import Memory
from models.gallery import Gallery
from werkzeug.utils import secure_filename
from datetime import datetime
import os

app = Flask(__name__)
app.config.from_object(Config)

# ---------------- CONFIG ---------------- #

CORRECT_PIN = "3707"

UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

db.init_app(app)

with app.app_context():
    db.create_all()

# ---------------- HOME ---------------- #

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/pin")
def pin():
    return render_template("pin.html")


@app.route("/verify_pin", methods=["POST"])
def verify_pin():

    pin = request.form.get("pin")

    if pin == CORRECT_PIN:
        return jsonify({"success": True})

    return jsonify({"success": False})


@app.route("/home")
def home():
    return render_template("home.html")


# ---------------- DIARY ---------------- #

@app.route("/diary", methods=["GET", "POST"])
def diary():

    if request.method == "POST":

        title = request.form.get("title")
        content = request.form.get("content")

        print("Title:", title)
        print("Content:", content)

        try:

            new_entry = Diary(
                title=title,
                content=content
            )

            db.session.add(new_entry)
            db.session.commit()

            print("Diary Saved Successfully")

        except Exception as e:

            db.session.rollback()
            print("Diary Error:", e)

        return redirect(url_for("diary"))

    entries = Diary.query.order_by(
        Diary.created.desc()
    ).all()

    return render_template(
        "diary.html",
        entries=entries,
        moment=datetime.now().strftime("%d %B %Y")
    )


# ---------------- DELETE DIARY ---------------- #

@app.route("/delete/<int:id>")
def delete_entry(id):

    entry = Diary.query.get_or_404(id)

    db.session.delete(entry)
    db.session.commit()

    return redirect(url_for("diary"))


# ---------------- EDIT DIARY ---------------- #

@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit_entry(id):

    entry = Diary.query.get_or_404(id)

    if request.method == "POST":

        entry.title = request.form.get("title")
        entry.content = request.form.get("content")

        db.session.commit()

        return redirect(url_for("diary"))

    return render_template(
        "edit_diary.html",
        entry=entry
    )


# ---------------- GALLERY ---------------- #

@app.route("/gallery", methods=["GET", "POST"])
def gallery():

    if request.method == "POST":

        image = request.files.get("image")
        caption = request.form.get("caption")

        if image and image.filename != "":

            filename = secure_filename(image.filename)

            image.save(
                os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    filename
                )
            )

            photo = Gallery(
                filename=filename,
                caption=caption
            )

            db.session.add(photo)
            db.session.commit()

            return redirect(url_for("gallery"))

    images = Gallery.query.order_by(
        Gallery.uploaded.desc()
    ).all()

    return render_template(
        "gallery.html",
        images=images
    )


@app.route("/delete_photo/<int:id>")
def delete_photo(id):

    photo = Gallery.query.get_or_404(id)

    path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        photo.filename
    )

    if os.path.exists(path):
        os.remove(path)

    db.session.delete(photo)
    db.session.commit()

    return redirect(url_for("gallery"))


# ---------------- MEMORIES ---------------- #

@app.route("/memories", methods=["GET", "POST"])
def memories():

    if request.method == "POST":

        image = request.files.get("image")
        caption = request.form.get("caption")

        if image and image.filename != "":

            filename = secure_filename(image.filename)

            image.save(
                os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    filename
                )
            )

            memory = Memory(
                image=filename,
                caption=caption
            )

            db.session.add(memory)
            db.session.commit()

            return redirect(url_for("memories"))

    memories = Memory.query.order_by(
        Memory.created.desc()
    ).all()

    return render_template(
        "memories.html",
        memories=memories
    )


@app.route("/delete_memory/<int:id>")
def delete_memory(id):

    memory = Memory.query.get_or_404(id)

    path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        memory.image
    )

    if os.path.exists(path):
        os.remove(path)

    db.session.delete(memory)
    db.session.commit()

    return redirect(url_for("memories"))


# ---------------- MUSIC ---------------- #

@app.route("/music")
def music():
    return render_template("music.html")


# ---------------- RUN ---------------- #

if __name__ == "__main__":
    app.run(debug=True)