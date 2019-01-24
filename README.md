# HALPQ

- Ticketing system that helps bootcamp students ask instructors for help in real-time
- Has two kinds of user account with different privileges
- Has user-management page where admins can assign admin privileges to users
- Admins can create classrooms, which will also generate classroom keys
- Students can enroll in classrooms using keys distributed to them by admins in order to be able to post questions
- Admins can enable/disable classrooms (students cannot post questions when classroom is disabled)
- Any admin can start a chat with any student, but students can only reply to chats started with them
- Admins have an ability to mark student questions as “Being helped” and later as “Complete” which will send the question to the Archive
- Uses firebase real-time database as a back-end and React on the front-end
- Fully responsive

Use the code `LTEEjNet` to enroll in a classroom
[Check it out live](https://thehalpq.ca)

## Getting Started

1. Run `npm install` in the project directory to install required dependencies.
2. Start a local server by running `npm start`.
3. Visit `http://localhost:3000/`

## Desktop Screenshots

### Classroom List

<img width="720" alt="Halpq desktop screenshot" src="https://user-images.githubusercontent.com/28285782/50721755-93a75f00-1092-11e9-8222-ca0be0878b33.png">

### Classroom

<img width="720" alt="Halpq desktop screenshot" src="https://user-images.githubusercontent.com/28285782/50721756-9609b900-1092-11e9-96e9-35b328d0029a.png">

### User management page

<img width="720" alt="Halpq desktop screenshot" src="https://user-images.githubusercontent.com/28285782/50721758-97d37c80-1092-11e9-8dc2-5cf167134224.png">

### Chat Window

<img width="720" alt="Halpq desktop screenshot" src="https://user-images.githubusercontent.com/28285782/50721759-9a35d680-1092-11e9-8e3f-4bb9f8609488.png">

## Mobile Screenshots

### Classroom List

<img width="352" alt="Halpq mobile screenshots" src="https://user-images.githubusercontent.com/28285782/50721781-16c8b500-1093-11e9-8edb-35c066ca4c4c.png">

### Creating a classroom

<img width="352" alt="Halpq mobile screenshots" src="https://user-images.githubusercontent.com/28285782/50721782-1b8d6900-1093-11e9-8921-0e11adfa4dc2.png">

### Classroom

<img width="352" alt="Halpq mobile screenshots" src="https://user-images.githubusercontent.com/28285782/50721783-1e885980-1093-11e9-9ce8-1af91aa05fdc.png">

### Question submit form

<img width="352" alt="Halpq mobile screenshots" src="https://user-images.githubusercontent.com/28285782/50721786-21834a00-1093-11e9-8cd6-cd52a238cfd9.png">

### Chat Window

<img width="352" alt="Halpq mobile screenshots" src="https://user-images.githubusercontent.com/28285782/50721787-23e5a400-1093-11e9-865b-448f89135333.png">
