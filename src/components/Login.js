import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "../hooks/useForm";
import axios from "axios";
const schema = yup.object().shape({
  username: yup.string().required("Username or Password not valid"),
  password: yup.string().required("Username or Password not valid")
});
const initialValues = {
  username:"",
  password:""
};
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues,setFormValues,validate] = useForm(initialValues,schema);
  const [error,setError] = useState("");
  //replace with error state
  const handleChange=(e)=>{
    const{name, value} = e.target;
    setFormValues({...formValues,[name]:value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const [formErrors,isValid] = await validate();
    if(isValid){
      setError("");
      axios.post("http://localhost:5000/api/login",formValues)
      .then((res)=>{
        localStorage.setItem("token",res.data.payload);
      })
      .catch((err)=>{
        setError("Username or Password not valid");
        console.log({err});
      })
      // make api call
      // localStorage.setItem("token",)
    }
    else{
      setError(formErrors[Object.keys(formErrors).find(key=>formErrors[key]!=="")]);
    }
  };
  const {username, password} = formValues;
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User Name
            <input id="username" name="username" type="text" value={username} onChange={handleChange} />
          </label>
          <label>
            Password
            <input id="password" name="password" type="password" value={password} onChange={handleChange} />
          </label>
          <button id="submit" type="submit">Submit</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"