import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Layout(){

    const [authenticated, setAuthenticated] = useState(false)
    let navigate = useNavigate();

    useEffect(()=>{

        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email);
              setAuthenticated(true)
              const uid = user.uid;
            } else {
              // User is signed out
              // ...
            }
          });

    }, [])

    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            setAuthenticated(false)
            navigate("/login");
        }).catch((error) => {
        // An error happened.
        });
    }

    return(
        <main className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-white" to="/">Home</Link>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="contact">Contact</Link>
                        </li>
                        

                    </ul>
                    <ul className="navbar-nav ms-auto">
                    { authenticated
                            ?
                            <li className="nav-item">
                                <Link className="nav-link text-white" onClick={logout} >Logout</Link>
                            </li>
                            :
                            <>
                             <li className="nav-item">
                            <Link className="nav-link text-white" to="login">Login</Link>
                            </li><li className="nav-item">
                                <Link className="nav-link text-white" to="register">Register</Link>
                            </li>
                            </>
                        }
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="container p-5">
            <Outlet></Outlet>
            </div>

            <footer className="bg-light p-3 text-center footer mt-auto">
                <p>This is the footer.</p>
            </footer>
        </main>
    )
}

export default Layout;