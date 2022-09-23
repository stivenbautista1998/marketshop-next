import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import { validateEmail } from '@helpers/validations';
import AppContext from "@context/AppContext";
import { AuthContext } from "@context/AuthContext";

const defaultErrorState = {
    email: { error: false, text: "" },
    pass: { error: false, text: "" },
    errorMessage: ""
};

const useLogin = () => {
    const { getUserCurrentState } = useContext(AppContext);
    const { validateUser, setCurrentUser } = useContext(AuthContext);

    const [ errorState, setErrorState ] = useState(defaultErrorState);
    const formRef = useRef(null);
    let router = useRouter();
    console.log("use login!")
    const handlerSubmit = (event) => {
        event.preventDefault();
        setErrorState(defaultErrorState);
        const formData = new FormData(formRef.current); // FormData: native object used to get info from forms easily.
        const data = {
            user: formData.get('user-txt'),
            password: formData.get('password-txt')
        };
        if(data.user !== "" && data.password !== "") {
            if(validateEmail(data.user)) {
                const userInfo = validateUser(data.user, data.password, true);

                if(userInfo) {
                    setCurrentUser(userInfo); // set this user as the current one
                    getUserCurrentState(userInfo); // get all the state info for that user.
                    router.push("/");
                } else {
                    console.log("wrong user info!");
                    setErrorState({
                        email: { error: true, text: "" },
                        pass: { error: true, text: "" },
                        errorMessage: "Invalid username or password"
                    });
                }
            } else {
                console.log("please provide a valid email.");
                setErrorState({
                    email: { error: true, text: "Enter a valid email address" },
                    pass: { error: false, text: "" },
                    errorMessage: ""
                });
            }
        } else {
            console.log("is empty");
            if(data.user === "" && data.password === "") {
                setErrorState({
                    email: { error: true, text: "" },
                    pass: { error: true, text: "" },
                    errorMessage: "The fields should not be empty."
                });
            } else if(data.user === "") {
                setErrorState({
                    email: { error: true, text: "Email is empty" },
                    pass: { error: false, text: "" },
                    errorMessage: ""
                });
            } else if(data.password === "") {
                setErrorState({
                    email: { error: false, text: "" },
                    pass: { error: true, text: "Password is empty" },
                    errorMessage: ""
                });
            }
        }
        console.log(data);
    };

    function loginOnChange() {
        if(errorState.email.error) {
            // if the condition is true it means that all the fields are set as error, so this will set errors to false.
            if(errorState.errorMessage === "Invalid username or password") {
                setErrorState({
                    ...errorState,
                    email: { error: false, text: "" },
                    pass: { error: false, text: "" }
                });
            } else {
                // if condition is false it will only remove the error on the password field.
                setErrorState({
                    ...errorState,
                    email: { error: false, text: "" }
                });
            }
        }
    }

    function passOnChange() {
        if(errorState.pass.error) {
            // if the condition is true it means that all the fields are set as error, so this will set errors to false.
            if(errorState.errorMessage === "Invalid username or password") {
                setErrorState({
                    ...errorState,
                    email: { error: false, text: "" },
                    pass: { error: false, text: "" }
                });
            } else {
                // if condition is false it will only remove the error on the password field.
                setErrorState({
                    ...errorState,
                    pass: { error: false, text: "" }
                });
            }
        }
    }

    function showMyAccount() {
        router.push("/create-account");
    }

    return { formRef, handlerSubmit, showMyAccount, loginOnChange, passOnChange, errorState };
};

export { useLogin };
