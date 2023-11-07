function Student({firstname, lastname, grade, deleteStudent, studentID}){
    return(
        <div className="alert alert-light">
            <small></small>
            {lastname}, {firstname} <span class="badge bg-dark">{grade}</span>
            <button onClick={()=>{
                deleteStudent(studentID, firstname, lastname)
            }} className="btn btn-danger btn-sm float-end">Delete</button>
            <button className="btn btn-secondary btn-sm float-end me-2">Edit</button>
        </div>
        
    )
}

export default Student;