# Events Management System

## Description
The **Events Management System** is a full-stack web application that allows administrators to create and manage events, while users can browse and book events. It provides a seamless experience for event organizers and attendees.

## Features
### Admin
- Register and log in as an admin.
- Create, edit, and delete events.
- View all booked events and manage users.

### User
- Register and log in as a normal user.
- Browse available events.
- Book an event.
- View booked events.

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Hosting:** Render (or other deployment platforms)

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/georgeyegon/events-management-system.git
   cd events-management-system
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the required database and authentication credentials.
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```

4. **Run the backend:**
   ```sh
   cd backend
   npm start
   ```

5. **Run the frontend:**
   ```sh
   cd frontend
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a user/admin
- `POST /api/auth/login` - Login a user/admin

### Events
- `POST /api/events` - Create an event (Admin only)
- `GET /api/events` - Get all events
- `PUT /api/events/:id` - Update an event (Admin only)
- `DELETE /api/events/:id` - Delete an event (Admin only)

### Bookings
- `POST /api/bookings` - Book an event
- `GET /api/bookings` - View booked events

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out to [georgeyegon01@gmail.com](mailto:georgeyegon01@gmail.com).

