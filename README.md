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

[Check it out live](https://thehalpq.ca)

## Getting Started

1. Run `npm install` in the project directory to install required dependencies.
2. Start a local server by running `npm start`.
3. Visit `http://localhost:3000/`

## Final Product

### Desktop screenshots

<img width="720" alt="Halpq Screenshot" src="https://user-images.githubusercontent.com/28285782/50721755-93a75f00-1092-11e9-8222-ca0be0878b33.png">

<img width="720" alt="Halpq Screenshot" src="https://user-images.githubusercontent.com/28285782/50721756-9609b900-1092-11e9-96e9-35b328d0029a.png">

<img width="720" alt="Halpq Screenshot" src="https://user-images.githubusercontent.com/28285782/50721758-97d37c80-1092-11e9-8dc2-5cf167134224.png">

<img width="720" alt="Halpq Screenshot" src="https://user-images.githubusercontent.com/28285782/50721759-9a35d680-1092-11e9-8e3f-4bb9f8609488.png">

### Mobile Screenshots

![halpq-mobile-1](https://user-images.githubusercontent.com/28285782/50721494-65278500-108e-11e9-88ea-fe1de394c17a.png)
![halpq-mobile-2](https://user-images.githubusercontent.com/28285782/50721495-6658b200-108e-11e9-9fdf-a3363a464a3e.png)
![halpq-mobile-3](https://user-images.githubusercontent.com/28285782/50721497-6789df00-108e-11e9-9e84-b8ca9a29f963.png)
![halpq-mobile-4](https://user-images.githubusercontent.com/28285782/50721498-68bb0c00-108e-11e9-88ec-1bc4e8362caa.png)
![halpq-mobile-5](https://user-images.githubusercontent.com/28285782/50721499-6b1d6600-108e-11e9-8598-18145ea7dd65.png)
