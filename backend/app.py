from flask import Flask, request, jsonify
from models import db, User, Event
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError  # To handle unique constraint errors

app = Flask(__name__)

@app.route('/users', methods=['POST'])
def register_user():
    try:
        # Get the data from the request
        data = request.get_json()

        # Validate required fields
        if not data.get('username') or not data.get('password'):
            return jsonify({"error": "Username and password are required"}), 400

        # Check if the username already exists
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400

        # Hash the password before saving
        hashed_password = generate_password_hash(data['password'], method='sha256')

        # Create a new user object
        new_user = User(
            username=data['username'],
            image_url=data.get('image_url', ''),
            password=hashed_password,
            role=data.get('isAdmin', False)  # Default to False if not specified
        )

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()

        # Return the created user (without password)
        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "image_url": new_user.image_url,
            "role": new_user.role
        }), 201

    except IntegrityError as e:
        db.session.rollback()  # Rollback the session in case of errors
        return jsonify({"error": "Database error: User might already exist."}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()

    # Serialise events and return as JSON
    return jsonify([event.to_dict() for event in events])

if __name__ == '__main__':
    app.run(debug=True)
