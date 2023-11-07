import Student from "./Student";
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

function Home(){

    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [studentList, setStudentList] = useState([]);

    useEffect(() => {

        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        try {

            onSnapshot( collection(db, 'students'), snapshot => {
                
                const newStudentList = [];
                
                snapshot.forEach(student => {
                    newStudentList.push(student.data());
                });

                setStudentList(newStudentList);
                
            });
            
        }catch(e){
            alert('Could not fetch student data!')
        }

        
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