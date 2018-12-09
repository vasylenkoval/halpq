import firebase from 'firebase';
// Convert student to an admin
export const makeAdmin = studentUID => {
  const dbRef = firebase.database();
  dbRef.ref(`/Users/Students/${studentUID}`).once('value', snapshot => {
    if (snapshot.exists()) {
      dbRef.ref(`/Users/Admins/${studentUID}`).set(snapshot.val());
      dbRef.ref(`/Users/Students/${studentUID}`).remove();
      console.log(
        'USER IS PRESENT IN STUDENTS REF, MOVING TO ADMIN AND DELETING FROM STUDENTS'
      );
    } else {
      console.log('NO SUCH USER');
    }
  });
};

// Conver Admin to Student

export const makeStudent = adminUID => {
  const dbRef = firebase.database();
  dbRef.ref(`/Users/Admins/${adminUID}`).once('value', snapshot => {
    if (snapshot.exists()) {
      dbRef.ref(`/Users/Students/${adminUID}`).set(snapshot.val());
      dbRef.ref(`/Users/Admins/${adminUID}`).remove();
      console.log(
        'USER IS PRESENT IN STUDENTS REF, MOVING TO ADMIN AND DELETING FROM STUDENTS'
      );
    } else {
      console.log('NO SUCH ADMIN');
    }
  });
};

// Testing

// Function to create a classroom - only avilable to admins in Classroom List view.
export const createClassroom = name => {
  const dbRef = firebase.database();
  dbRef.ref(`/Classrooms/`).push({
    classKey: '',
    classroomName: name,
    enrolledStudents: 0,
  });
};

// Function to delete a classroom
export const deleteClassroom = classKey => {
  const dbRef = firebase.database();
  dbRef.ref(`/Classrooms/${classKey}`).remove();
};

// Method to create a question in the classroom - needs a classroom reference. Should be moved to the HelpCue view.
export const createQuestion = (classroomRef, questionContent, userLocation) => {
  const dbRef = firebase.database();
  dbRef.ref(`/Questions/${classroomRef}`).push({
    name: this.state.user.displayName,
    content: questionContent,
    uid: this.state.user.uid,
    photoURL: this.state.user.photoURL,
    dateCreated: +new Date(),
    dateHelped: 0,
    dateCompleted: 0,
    isCompleted: false,
    location: userLocation,
    whoHelped: 0,
    isBeingHelped: false,
  });
};

// Function to archive a question

export const archiveQuestion = (classroomRef, questionRef) => {
  const currRef = firebase
    .database()
    .ref(`/Questions/${classroomRef}/${questionRef}`);
  const archiveRef = firebase
    .database()
    .ref(`Archive/${classroomRef}/${questionRef}`);
  currRef.once('value', snapshot => {
    archiveRef.set(snapshot.val());
    currRef.remove();
  });
};

// Method to enroll in the classroom - should be moved to the Classroom List view.
// Consider creating a duplicate shallow reference in the DB to store just the keys of the classrooms to prevent from downloading all nested data
export const classroomEnroll = enrollPassword => {
  const dbRef = firebase.database();
  dbRef.ref(`/Classrooms`).once('value', snapshot => {
    const classroomMatch = Object.entries(snapshot.val()).filter(element =>
      element[0].includes(enrollPassword)
    );
    if (classroomMatch.length > 0) {
      // If there is a match - record a student in classroom ref
      dbRef
        .ref(
          `/Classrooms/${classroomMatch[0][0]}/enrolledStudents/${
            this.state.user.uid
          }`
        )
        .set(this.state.user.displayName);

      // Also record a class key in student's own profile
      dbRef
        .ref(
          `/Users/${this.state.isAdmin ? `Admins` : `Students`}/${
            this.state.user.uid
          }/enrolledClasses/${classroomMatch[0][0]}`
        )
        .set(`${classroomMatch[0][1].classroomName}`);
      this.createClassList();
    } else {
      console.log('Wrong key!');
    }
  });
};
