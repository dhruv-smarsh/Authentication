import React, { Component } from 'react'
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from 'yup';
import '../style/Registration.css'
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

export class Registration extends Component<any,any> {
  static propTypes = {

  }
  constructor(props: any) {
      super(props);
      this.state = {
          open: false,
          vertical: 'top',
          horizontal: 'right',
      }
  }

    handleClose = () => {
        this.setState({
            ...this.state,
            open: true
        })
    };

  render() {
    return (
        <>
          <Formik initialValues={{
            name: '',
            email: '',
            password: '',
            confirm_password: ''
          }}
                  validationSchema={yup.object({
                    name: yup.string().min(2).max(25).required("Please enter Yor name"),
                    email: yup.string().email().required("Please enter Yor email"),
                    password: yup.string().min(6).required("Please enter Yor password"),
                    confirm_password: yup.string().required().oneOf([yup.ref("password"), ''], "Please must match")
                  })} onSubmit= {values => {

            axios.post('http://localhost:3000/api/auth/register', values).then((res: any) => {
                debugger
            });
            this.setState({
                ...this.state,
                open: true
            })

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
                            <TextField id="name" name="name" value={values.name} label="Name"
                                      onChange={handleChange} onBlur={handleBlur} placeholder="name" variant="outlined" />
                            <p className={`form-error`}>{errors.name && touched.name && errors.name}</p>
                          </div>
                          <div className="input-block">
                            <TextField id="email" name="email" value={values.email} label="Email"
                                       onChange={handleChange} onBlur={handleBlur} placeholder="email" variant="outlined" />
                              <p className={`form-error`}>{errors.email && touched.email && errors.email}</p>
                          </div>
                          <div className="input-block">
                            <TextField id="password" name="password" value={values.password} label="Password"
                                       onChange={handleChange} onBlur={handleBlur} placeholder="password" variant="outlined" />
                              <p className={`form-error`}>{errors.password && touched.password && errors.password}</p>
                          </div>
                          <div className="input-block">
                            <TextField id="confirm_password" name="confirm_password" value={values.confirm_password} label="Confirm Password"
                                       onChange={handleChange} onBlur={handleBlur} placeholder="password" variant="outlined" />
                              <p className={`form-error`}>{errors.confirm_password && touched.confirm_password && errors.confirm_password}</p>
                          </div>
                          <div className="modal-buttons">
                            <Link to="#" className="">
                              Want to register using Gmail?
                            </Link>
                            <button className="input-button" type="submit">
                              Registration
                            </button>
                          </div>
                        </form>
                        <p className="sign-up">
                          Already have an account? <Link to="/login">Sign In now</Link>
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
                open={this.state.open}
                autoHideDuration={500}
                onClose={this.handleClose}
                message="Note archived"
            />
        </>
    )
  }
}

export default Registration
