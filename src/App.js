import './App.css';
import React, {useState, useEffect} from "react";
import DoLogin from "./login.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useParams,
    useLocation,
    useHistory
} from "react-router-dom";
import loginFacade from './apiFacade';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    let history = useHistory();
    const goHome = () => {
        history.push("/");
    }
    return (
        <div>
            <Header loginMsg={
                    isLoggedIn ? "Logout" : "Login"
                }
                isLoggedIn={isLoggedIn}/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <DoLogin loggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        goHome={goHome}/>
                </Route>
                <Route exact path="/externData">
                    <ExternData/>
                </Route>
                <Route>
                    <NoMatch/>
                </Route>
            </Switch>
        </div>

    );
}

function Header({isLoggedIn, loginMsg}) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/externData">Extern API</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}</NavLink>
            </li>

        </ul>

    )
}


function Home() {
    return (
        <div>
            <h2>Home</h2>
            <h3>How to use:</h3>
            <ul>
                <li>Login as User or Admin using username and password made in backend process</li>
                <li>User and Admin use different endpoints for login</li>
                <li>
                    <b>Extern API</b>
                    use five different extern REST API endpoints through backend.</li>
                <li>Make sure to have backend running locally or delpoyet, and adjust link(s) in
                    <b>settings.js</b>
                </li>
                <li>Link to backend startcode:
                    <a href="https://github.com/sslhansen/3semCA3backend">Backend Startcode</a>
                </li>
            </ul>
        </div>
    )
}

function ExternData() {
    const [nbaInfo, setNbaInfo] = useState();
    const getTeamInfo = (event) => {
        const id = event.target.id
        loginFacade.fetchExternData(id).then(res => setNbaInfo(res)).then(setNbaInfo({
            ...nbaInfo
        }))
    }
    return (
        <div>
            <button id="1"
                onClick={getTeamInfo}>Team 1</button>
            <button id="2"
                onClick={getTeamInfo}>Team 2</button>
            <button id="3"
                onClick={getTeamInfo}>Team 3</button>
            <button id="4"
                onClick={getTeamInfo}>Team 4</button>
            {
            JSON.stringify(nbaInfo)
        } </div>
    )


}


function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>No match for
                <code>{
                    location.pathname
                }</code>
            </h3>
        </div>
    )
}

export default App;