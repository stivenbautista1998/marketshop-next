import { useState } from 'react';
import { validateEmail } from '@helpers/validations';

const defaultErrorState = {
  username: { error: false, text: "" },
  email: { error: false, text: "" },
  pass: { error: false, text: "" },
  passConfirm: { error: false, text: "" },
  errorMessage: ""
};

const useMyAccount = ({ currentUser, editCurrentUserInfo, validateUser }) => {
  const [ isEditable, setIsEditable ] = useState(false);
  const [ userName, setUsername ] = useState(currentUser?.username);
  const [ userEmail, setUserEmail ] = useState(currentUser?.email);
  const [ userPassWord, setUserPassWord ] = useState(currentUser?.passWord);
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ showPassConfirm, setShowPassConfirm ] = useState(false);
  const [ errorState, setErrorState ] = useState(defaultErrorState);

  const editAccount = () => {
    if(isEditable) {
      if(!thereIsEmptyFields(userName, userEmail, userPassWord, confirmPassword)) {
        // we validate if the password fields are the same or if the password has not been changed. otherwise, won't save changes
        if((userPassWord === confirmPassword) || (userPassWord > 0 && !showPassConfirm)) {
          const isRegisteredEmail = validateUser(userEmail, "", false);
          // if the email is different and already exist then show the message and won't save changes.
          if(userEmail !== currentUser.email && isRegisteredEmail) {
            setErrorState({
              username: { error: false, text: "" },
              email: { error: true, text: "Existing Email address" },
              pass: { error: false, text: "" },
              passConfirm: { error: false, text: "" },
              errorMessage: "The email belongs to an existing user"
            });
          } else if(!validateEmail(userEmail)) {
            setErrorState({
              username: { error: false, text: "" },
              email: { error: true, text: "Enter a valid email address" },
              pass: { error: false, text: "" },
              passConfirm: { error: false, text: "" },
              errorMessage: ""
            });
          } else {
            // saving changes
            editCurrentUserInfo({
              username: userName,
              email: userEmail,
              passWord: userPassWord,
              image: ""
            });
            coldFields();
          }
        } else {
          setErrorState({
            username: { error: false, text: "" },
            email: { error: false, text: "" },
            pass: { error: true, text: "" },
            passConfirm: { error: true, text: "" },
            errorMessage: "The passwords don't match"
          });
        }
      }
    } else {
      setIsEditable(true);
    }
  }

  const thereIsEmptyFields = (userInfo, emailInfo, passInfo, passConfirmInfo) => {
    let result = false;

    if(userInfo === "" || emailInfo === "" || passInfo === "" || (passConfirmInfo === "" && showPassConfirm)) {
      setErrorState({
        username: { error: (userInfo === ""), text: "" },
        email: { error: (emailInfo === ""), text: "" },
        pass: { error: (passInfo === ""), text: "" },
        passConfirm: { error: ((passConfirmInfo === "") && showPassConfirm), text: "" },
        errorMessage: "No field should be empty."
      });
      result = true;
    } else if(userInfo === currentUser.username && emailInfo === currentUser.email && passInfo === currentUser.passWord) {
      setErrorState({
        username: { error: false, text: "" },
        email: { error: false, text: "" },
        pass: { error: false, text: "" },
        passConfirm: { error: false, text: "" },
        errorMessage: "The user information is the same"
      });
      result = true;
    }

    return result;
  }

  const coldFields = () => {
    setIsEditable(false);
    setConfirmPassword("");
    setShowPassConfirm(false);
    setErrorState(defaultErrorState);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if(name === "username-txt") {
      setUsername(value);
      if(errorState.username.error) {
        setErrorState({
          ...errorState,
          username: { error: false, text: "" }
        });
      }
    } else if(name === "email-txt") {
      setUserEmail(value);
      if(errorState.email.error) {
        setErrorState({
          ...errorState,
          email: { error: false, text: "" }
        });
      }
    } else if(name === "password-txt") {
      setUserPassWord(value);
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
      setConfirmPassword(value);
      if(errorState.passConfirm.error) {
        setErrorState({
          ...errorState,
          pass: { error: false, text: "" },
          passConfirm: { error: false, text: "" }
        });
      }
    }
  }

  const syncUserData = () => {
    setUsername(currentUser?.username);
    setUserEmail(currentUser?.email);
    setUserPassWord(currentUser?.passWord);
  }

  return {
    isEditable,
    userName,
    userEmail,
    userPassWord,
    confirmPassword,
    showPassConfirm,
    onChangeHandler,
    editAccount,
    syncUserData,
    errorState
  };
};

export { useMyAccount };
