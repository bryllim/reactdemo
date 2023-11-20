import Student from "./Student";
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home(){

    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [studentList, setStudentList] = useState([]);
    const [authenticated, setAuthenticated] = useState(false)
    const [editToggle, setEditToggle] = useState(false);
    const [userProperties, setUserProperties] = useState({});

    useEffect(() => {

        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        try {

            onSnapshot( collection(db, 'students'), snapshot => {
                
                const newStudentList = [];
                
                snapshot.forEach(student => {
                    const tempStudent = student.data();
                    tempStudent["student_id"] = student.id;
                    newStudentList.push(tempStudent);
                });

                setStudentList(newStudentList);
                
            });
            
        }catch(e){
            alert('Could not fetch student data!')
        }

        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthenticated(true)
              console.log(user.providerData);
              setUserProperties(user);
            } else {
              // User is signed out
              // ...
            }
          });

        
    }, [])

    const addStudent = () => {

        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        if( student.firstname === '' || student.lastname === '' || student.grade === ''){
            alert("Missing fields!");
        }else{
            setStudentList(
                studentList => [
                    ...studentList, student
                ]
            );

            addDoc(collection(db, 'students'), student);
    
            setStudent({
                firstname: '',
                lastname: '',
                grade: '',
            });

        }

    }

    const deleteStudent = (studentID, firstname, lastname) => {

       // Initialize Cloud Firestore and get a reference to the service
       const db = getFirestore(firebaseApp);

       confirm(`Are you sure you want to delete ${firstname} ${lastname}?`).then(
            deleteDoc(doc(db, "students", studentID))
       );
        
    }

    const updateStudent = (studentID, firstname, lastname, grade) => {
        setEditToggle(true);

        setStudent({
            studentID: studentID,
            firstname: firstname,
            lastname: lastname,
            grade: grade
        });
    }

    const handleStudentUpdate = () => {

        // Initialize Cloud Firestore and get a reference to the service
       const db = getFirestore(firebaseApp);

        const studentRef = doc(db, "students", student.studentID);
        
        updateDoc(studentRef, {
            firstname: student.firstname,
            lastname: student.lastname,
            grade: student.grade
        });

        setEditToggle(false);
        setStudent({
            firstname: '',
            lastname: '',
            grade: '',
        });

    }

    if(authenticated){
        return(
            <section>
                <h1 className="fw-bold">Hello, {userProperties.displayName}</h1>
                <p>This is a list of student records.</p>
                <div className="mb-5 p-5 border">
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="firstname">First name:</label>
                            <input id="firstname"
                                onChange={(e)=>setStudent({
                                    ...student,
                                    firstname: e.target.value,
                                })}
                                value={student.firstname}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="lastname">Last name:</label>
                            <input id="lastname"
                                 onChange={(e)=>setStudent({
                                    ...student,
                                    lastname: e.target.value
                                })}
                                value={student.lastname}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="grade">Grade:</label>
                            <input id="grade"
                                onChange={(e)=>setStudent({
                                    ...student,
                                    grade: e.target.value
                                })}
                                value={student.grade}
                                className="form-control"
                                type="number"
                            />
                        </div>
    
                        {
                            editToggle
                            
                            ?
    
                            (
                                <div className="col-md-2">
                                    <button onClick={()=>{handleStudentUpdate()}} className="btn btn-success mt-3">Update</button>
                                </div>
                            )
    
                            :
    
                            (
                                <div className="col-md-2">
                                    <button onClick={()=>{addStudent()}} className="btn btn-dark mt-3">Add +</button>
                                </div>
                            )
    
                        }
    
                        <div className="alert alert-light mt-3">
                            <h3 className="fw-bold">{student.firstname} {student.lastname} <span className="badge bg-dark">{student.grade}</span></h3>
                        </div>        
                    </div>
                    <br />
                </div>
    
                {
                    studentList.map((studentRecord) => (
                        <Student
                            key={studentRecord.id}
                            firstname={studentRecord.firstname}
                            lastname={studentRecord.lastname}
                            grade={studentRecord.grade}
                            deleteStudent={deleteStudent}
                            updateStudent={updateStudent}
                            studentID={studentRecord.student_id}
                        />
                    ))
                }
    
    
                
            </section>
        )
    }else{
        return (
            <section>
                <h1>Welcome guest!</h1>
            </section>
        )
    }

    
}

export default Home;