import Student from "./Student";
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";

function Home(){

    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [studentList, setStudentList] = useState([]);

    const [savedStudentList, setSavedStudentList] = useState([]);

    useEffect(() => {

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCY58ltu6EpqDw31z-0YhOoU4Kgt8tUrpQ",
            authDomain: "studentrecords-efc70.firebaseapp.com",
            projectId: "studentrecords-efc70",
            storageBucket: "studentrecords-efc70.appspot.com",
            messagingSenderId: "561287654338",
            appId: "1:561287654338:web:694600eae3acec3fa2c45b",
            measurementId: "G-R704YJPS2Q"
          };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(app);

        try {

            onSnapshot( collection(db, 'students'), snapshot => {
                
                snapshot.forEach(student => {
                    setSavedStudentList(
                        savedStudentList => [
                            ...savedStudentList,
                            student.data()
                        ]
                    );
                });

                setStudentList(savedStudentList);
                
            });
            
        }catch(e){
            alert('Could not fetch student data!')
        }

        
    }, [])

    const addStudent = () => {

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCY58ltu6EpqDw31z-0YhOoU4Kgt8tUrpQ",
            authDomain: "studentrecords-efc70.firebaseapp.com",
            projectId: "studentrecords-efc70",
            storageBucket: "studentrecords-efc70.appspot.com",
            messagingSenderId: "561287654338",
            appId: "1:561287654338:web:694600eae3acec3fa2c45b",
            measurementId: "G-R704YJPS2Q"
          };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(app);

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

    
            // localStorage.setItem('studentList', JSON.stringify(studentList));
        }

        

    }

    return(
        <section>
            <h1 className="fw-bold">👨🏻‍🎓 Student Records</h1>
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
                    <div className="col-md-2">
                        <button onClick={()=>{addStudent()}} className="btn btn-dark mt-3">Add +</button>
                    </div>

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
                    />
                ))
            }


            
        </section>
    )
}

export default Home;