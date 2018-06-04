import React from 'react';
import './css/index.css';
import { auth } from './firebase.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.inputOnChange = this.inputOnChange.bind(this);
        this.logInClicked = this.logInClicked.bind(this);
        this.signUpClicked = this.signUpClicked.bind(this);
        this.logOutClicked = this.logOutClicked.bind(this);
    }
    inputOnChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });

    }
    logInClicked(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        if (email && password) {
            const promise = auth.signInWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        } else {
            console.log("Missing email or password")
        }
    }
    signUpClicked(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        if (email && password) {
            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        } else {
            console.log("Missing email or password")
        }

        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
            }
        });
    }
    logOutClicked(e) {
        e.preventDefault();
        auth.signOut();
    }
    render() {
        return (
            <div id="logIn">
                <div>
                    <label className="recipe-label" htmlFor="email">Email
                    <input className="recipe-input" name="email" type="text" value={this.state.email} onChange={(event) => this.inputOnChange(event)} />
                    </label>
                </div>
                <div>
                    <label className="recipe-label" htmlFor="password">Password
                      <input className="recipe-input" name="password" type="password" id="password" value={this.state.password} onChange={(event) => this.inputOnChange(event)} />
                    </label>
                </div>
                <div className="text-right">
                    <button className="recipe-button" onClick={this.logInClicked}>Log in</button>
                </div>
                {/* <div>
                    <button className="recipe-button" onClick={this.signUpClicked}>Sign Up</button>
                </div> */}
            </div>
        )
    }
}
export { Login }