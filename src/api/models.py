from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    last_name = db.Column(db.String(30), unique=False, nullable=False)
    username  = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    salt = db.Column(db.String(200), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    description = db.Column(db.Text, unique=False, nullable=True)
    courses = db.relationship("Category")
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    physics = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    mathematics = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    chemistry = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    biology = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    programming = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    instructor_id = db.Column(db.Integer,db.ForeignKey("user.id"))

    def serialize(self):
        return{
            "id": self.id,
            "Física": self.physics,
            "Matemática": self.mathematics,
            "Química": self.chemistry,
            "Biología": self.biology,
            "Programación": self.programming
        }   

class Favorites(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    student_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    instructor_id = db.Column(db.Integer,db.ForeignKey("user.id"))

    def serialize(self):
        return{
            "id": self.id,
            "student_id": self.user_id,
            "instructor_id": self.instructor_id
        }   