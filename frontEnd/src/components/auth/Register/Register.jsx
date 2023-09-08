import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="invalid-feedback d-block">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

// const vconfpassword = (password, passwordTwo) => {
//     if (password !== passwordTwo) {
//         return (
//             <div className="invalid-feedback d-block">
//                 Password doesn't match
//             </div>
//         );
//     }
// }

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

    useEffect(() => {
        if (isCPasswordDirty) {
            if (password === confirmPassword) {
                setShowErrorMessage(false);
            } else {
                setShowErrorMessage(true)
            }
        }
    }, [confirmPassword])

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsCPasswordDirty(true);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0 && !showErrorMessage) {
            AuthService.register(email, password, confirmPassword).then(
                (response) => {
                    console.log(response.data.message)
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="auth__register">

            <h1>Register</h1>
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password <span className="required">*</span></label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm password <span className="required">*</span></label>
                            <Input
                                type="password"
                                className="form-control"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                                validations={[required]}
                            />
                            {showErrorMessage && isCPasswordDirty ? <div className="invalid-feedback d-block"> Passwords did not match </div> : ''}
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block"><span>Sign Up</span></button>
                        </div>
                    </div>
                )}

                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )} 
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
};

export default Register;