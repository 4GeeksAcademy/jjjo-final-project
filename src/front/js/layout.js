import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.js";
import { Demo } from "./pages/demo";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Private } from "./component/Private.jsx"
import { Subject } from "./component/Subject.jsx";
import  UserDetail  from "./component/UserDetail.jsx";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Update from "./component/Update.jsx";
import Following from "./component/Following.jsx"
import Background from "./component/Background.jsx"
import { Readmore } from "./pages/Readmore.jsx";
import { Aboutus } from "./pages/Aboutus.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/user" />
                        <Route element={<Following />} path="/user/following" />
                        <Route element={<Background />} path="/user/background" />
                        <Route element={<Update />} path="/user/update" />
                        <Route element={<Readmore />} path="/readmore" />
                        <Route element={<Aboutus />} path="/aboutus" />
                        <Route element={<Subject />} path="/:nature/:id" />
                        <Route element={<UserDetail />} path="/user/:id" />
                        <Route element={<h1>Not found!</h1>} />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
