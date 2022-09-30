import { useContext, useRef, useState } from 'react';
import { AuthContext } from "@context/AuthContext";
import AppContext from "@context/AppContext";
import { generateId } from '@helpers/format';
import { validateEmail } from '@helpers/validations';

const defaultErrorState = {
  username: { error: false, text: "" },
  email: { error: false, text: "" },
  pass: { error: false, text: "" },
  passConfirm: { error: false, text: "" },
  errorMessage: ""
};

const useCreateAccount = () => {
  const formRef = useRef(null);
  const [ showPassConfirm, setShowPassConfirm ] = useState(false);
  const [ passwordValue, setPasswordValue ] = useState("");
  const [ errorState, setErrorState ] = useState(defaultErrorState);
  const { validateUser, addNewUser } = useContext(AuthContext);
  const { addNewUserStateOrder } = useContext(AppContext);

  function checkNewAccount(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      username: formData.get("username-txt"),
      email: formData.get("email-txt"),
      passWord: formData.get("password-txt"),
      repeatedPassWord: formData.get("repeat-password-txt")
    }
    if(data.username !== "" && data.email !== "" && data.passWord !== "" && data.repeatedPassWord !== "") {

      if(validateEmail(data.email)) {
        // validating if the user do not exist
        if(data.passWord === data.repeatedPassWord) {
          if(!validateUser(data.email, "", false)) { // validateUser returns false the user do not exist
            const newUserId = `user-key-${ generateId() }`;
            addNewUser({
              id: newUserId,
              image: "",
              username: data.username,
              email: data.email,
              passWord: data.passWord
            }); // I didn't spread the data object to not obtain repeatedPassWord as well.
            addNewUserStateOrder(newUserId); // create new state order for the new created user.
            clearForm();
            console.log("new user successfully created!");
          } else {
            console.log("the user already exist");
            setErrorState({
              username: { error: false, text: "" },
              email: { error: true, text: "Existing Email address" },
              pass: { error: false, text: "" },
              passConfirm: { error: false, text: "" },
              errorMessage: "The email belongs to an existing user"
            });
          }
        } else {
          console.log("the password is not the same");
          setErrorState({
              username: { error: false, text: "" },
              email: { error: false, text: "" },
              pass: { error: true, text: "" },
              passConfirm: { error: true, text: "" },
              errorMessage: "The passwords don't match"
          });
        }
      } else {
        console.log("please provide a valid email.");
        setErrorState({
          username: { error: false, text: "" },
          email: { error: true, text: "Enter a valid email address" },
          pass: { error: false, text: "" },
          passConfirm: { error: false, text: "" },
          errorMessage: ""
        });
      }
    } else {
      console.log("empty data");
      setErrorState({
        username: { error: (data.username === ""), text: "" },
        email: { error: (data.email === ""), text: "" },
        pass: { error: (data.passWord === ""), text: "" },
        passConfirm: { error: ((data.repeatedPassWord === "") && showPassConfirm), text: "" },
        errorMessage: "No field should be empty."
      });
    }
    console.log({ data });
  }

  function onChangeHandler(event) {
    const { name, value } = event.target;

    if(name === "username-txt") {
      if(errorState.username.error) {
        setErrorState({
          ...errorState,
          username: { error: false, text: "" }
        });
      }
    } else if(name === "email-txt") {
      if(errorState.email.error) {
        setErrorState({
          ...errorState,
          email: { error: false, text: "" }
        });
      }
    } else if(name === "password-txt") {
      setPasswordValue(value);
      if(value.length > 0) {
        setShowPassConfirm(true);
      } else {
        setShowPassConfirm(false);
      }
      if(errorState.pass.error) {
        setErrorState({
          ...errorState,
          pass: { error: false, text: "" },
          passConfirm: { error: false, text: "" }
        });
      }
    } else if(name === "repeat-password-txt") {
      if(errorState.passConfirm.error) {
        setErrorState({
          ...errorState,
          pass: { error: false, text: "" },
          passConfirm: { error: false, text: "" }
        });
      }
    }
  }

  function clearForm() {
    document.getElementById("create-account-form").reset();
    setPasswordValue("");
    setShowPassConfirm(false);
    setErrorState(defaultErrorState);
  }

  return { formRef, showPassConfirm, passwordValue, checkNewAccount, onChangeHandler, errorState };
};

export { useCreateAccount };
