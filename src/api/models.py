from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class UserRol(Enum):
    admin='admin',
    general='general',
    instructor='instructor'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    last_name = db.Column(db.String(30), unique=False, nullable=False)
    username  = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    salt = db.Column(db.String(200), unique=False, nullable=False)
    rol = db.Column(db.Enum(UserRol),unique=False,nullable=False, default="general")
    description = db.Column(db.Text, unique=False, nullable=True)
    favorites = db.relationship("Favorites", uselist=True, backref="student", foreign_keys="Favorites.student_id" ) ### relationship to favorite table
    favorites = db.relationship("Favorites", uselist=True, backref="instructor", foreign_keys="Favorites.instructor_id" ) ### relationship to favorite table
    courses = db.relationship("Favorites_subject", uselist=True, backref="user") ### relationship to pivot table to add users

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "name": self.name, 
            "last_name" : self.last_name,
            "description" : self.description,
        
            
            # do not serialize the password, its a security breach
        }
    
class Favorites(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    student_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    instructor_id = db.Column(db.Integer,db.ForeignKey("user.id"))

    def serialize(self):
        return{
            "id": self.id,
            "student_id": self.student_id,
            "instructor_id": self.instructor.serialize()
            
        }   

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30),unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=True) 
    image_banner = db.Column(db.String(180), nullable=False)
    favorites_subject = db.relationship("Favorites_subject", uselist=True, backref="subject") ### relationship to pivot table to add subjects

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_banner": self.image_banner
        }   

class Favorites_subject(db.Model): ##this is a pivot table 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    subject_id = db.Column(db.Integer,db.ForeignKey("subject.id"))

    def serialize(self):
        return{
            "id": self.id,
            "user": self.user.serialize(),
            "subject_name": self.subject.name,
        }  
