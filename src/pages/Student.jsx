function Student({firstname, lastname, grade}){
    return(
        <div className="alert alert-light">
            {lastname}, {firstname} <span class="badge bg-dark">{grade}</span>
            <button className="btn btn-danger btn-sm float-end">Delete</button>
            <button className="btn btn-secondary btn-sm float-end me-2">Edit</button>
        </div>
        
    )
}

export default Student;