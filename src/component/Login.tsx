import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from "yup";
import '../style/Registration.css';
import {Link, Navigate} from "react-router-dom";
import {TextField} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";


export class Login extends Component<any,any> {
  static propTypes = {

  }

  constructor(props: any) {
      super(props);

      this.state = {
          token: false,
          message: ''
      }
  }

  render() {
    return (

        <>
            {this.state.token && <Navigate to="/dashboard"/>}
          <Formik initialValues={{
            email: '',
            password: ''
          }}
                  validationSchema={yup.object({
                    email: yup.string().email().required("Please enter Yor email"),
                    password: yup.string().min(6).required("Please enter Yor password")
                  })} onSubmit= {values => {
                    axios.post('http://localhost:3000/api/auth/login', values).then((res: any) => {
                      if(res.data) {
                          localStorage.setItem('token', res.data.data.token )
                          this.setState({
                              token: true,
                              message: 'Login Successfull'
                          });
                      }
                    }).catch((error: any) => {
                        if(error.response) {
                          localStorage.removeItem('token')
                            this.setState({
                                token: false,
                                message: error.response.data.message
                            })
                        }
                    });
          }}>

            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
                <div className="container">
                  <div className="modal">
                    <div className="modal-container">
                      <div className="modal-left">
                        <h1 className="modal-title">Welcome!</h1>
                        <p className="modal-desc">
                          To the thapa technical website for programmers.
                        </p>
                        <form onSubmit={handleSubmit}>
                          <div className="input-block">
                            <TextField id="email" name="email" value={values.email} label="Email"
                                       onChange={handleChange} onBlur={handleBlur} placeholder="email" variant="outlined" />
                            <p className={`form-error`}>{errors.email && touched.email && errors.email}</p>
                          </div>
                          <div className="input-block">
                            <TextField id="password" name="password" value={values.password} label="Password" type="password"
                                       onChange={handleChange} onBlur={handleBlur} placeholder="password" variant="outlined" />
                            <p className={`form-error`}>{errors.password && touched.password && errors.password}</p>
                          </div>
                          <div className="modal-buttons">
                            <Link to="#" className="">
                              Want to register using Gmail?
                            </Link>
                            <button className="input-button" type="submit">
                              Login
                            </button>
                          </div>
                        </form>
                        <p className="sign-up">
                          Are you new here? <Link to="/registration">Sign Up now</Link>
                        </p>
                      </div>
                      <div className="modal-right">
                        <img
                            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                            alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </Formik>
            <Snackbar
                open={this.state.token}
                autoHideDuration={500}
                message={this.state.message}
            />
        </>
    )
  }
}

export default Login
