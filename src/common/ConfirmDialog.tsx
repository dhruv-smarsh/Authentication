import React, { Component } from 'react'
import {Box, Button, Dialog, DialogActions, DialogTitle, Input, TextField} from "@mui/material";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let initialValues = {
    id: '',
  title : '',
  description : '',
  price : '',
  gender: '',
  name: '',
  dob: null,
  mobile_number: '',
  official_email_address: '',
  personal_email_address: '',
  password: ''
};


export class ConfirmDialog extends Component<any,any> {

    constructor(props: any) {
        super(props);

        initialValues = {
            id: this.props.values.id,
            title: this.props.values.title,
            description: this.props.values.description,
            price: this.props.values.price,
            gender: '',
            name: '',
            dob: null,
            mobile_number: '',
            official_email_address: '',
            personal_email_address: '',
            password: ''
        }
    }

    openCreate = (value: string, row?: any) =>  {
        if(value === 'create'){
            this.setState({
                create: true,
                values: []
            })
        }else {
            this.setState({
                edit: true,
                values: row
            });
            initialValues = {
                id: row.id,
                title: row.title,
                description: row.description,
                price: row.price,
                gender: '',
                name: '',
                dob: null,
                mobile_number: '',
                official_email_address: '',
                personal_email_address: '',
                password: ''
            }
        }
    };

    close() {
       return this.props.close
    }

    setGender(value: string) {
        return initialValues.gender === value
    }

    setDate(){}

  render() {
    return (
        <React.Fragment>
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    { this.props.mode === 'create' ? "Add New Product" : "Update Product"}
                </DialogTitle>
                <Formik initialValues={initialValues}
                        validationSchema={yup.object({
                            title: yup.string().required("please Enter Your Product Name"),
                            id: yup.string().required("please Enter ID"),
                            name: yup.string().required("please Enter Name"),
                            mobile_number: yup.string().required("please Enter Your Mobile Number"),
                            official_email_address: yup.string().required("please Enter official email address"),
                            personal_email_address: yup.string().email("Invalid Email").required("please enter Personal email Address"),
                            password: yup.string().required("please Enter Your Password"),
                            dob: yup.string().required("please Enter Your date of birth")
                        })} onSubmit={values => {
                            debugger
                    let data = localStorage.getItem('token');
                    if(this.props.mode === 'edit') {
                        axios.patch(`http://localhost:3000/products/${values.id}`, values, {
                            headers: {
                                Authorization: `Bearer ${data}`
                            }
                        }).then((res: any) => {
                            this.props.close()
                        })
                    }else {
                        axios.post('http://localhost:3000/products', values, {
                            headers: {
                                Authorization: `Bearer ${data}`
                            }
                        }).then((res: any) => {
                            this.setState({
                                edit: false,
                                create: false
                            });
                        })
                    }
                }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                           <>
                           <div style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <div className="input-block">
                                    <TextField id="title" name="title" value={values.title} label="title"
                                               onChange={handleChange} onBlur={handleBlur} placeholder="title" variant="outlined" />
                                    <p >{errors?.title != '' && touched?.title && errors?.title}</p>
                                </div>

                                <div className="input-block">
                                    <TextField id="price" name="price" value={values.price} label="price"
                                               onChange={handleChange} onBlur={handleBlur} placeholder="price" variant="outlined" />
                                    <p >{errors.price && touched.price && errors.price}</p>
                                </div>
                            </div>
                            <div className="input-block">
                                <TextField id="description" name="description" value={values.description} label="description"
                                           multiline
                                           rows={4}
                                           onChange={handleChange} onBlur={handleBlur} placeholder="title" variant="outlined" />
                            </div>


                            <Box>
                <Box >
                  <label >Employee ID</label>
                  <Input
                    placeholder="Employee ID"
                    fullWidth={true}
                    type="text"
                    name='id'
                    value={values.id}
                    onChange={handleChange} onBlur={handleBlur}
                    disableUnderline
                  />
                   <ErrorMessage name="id" component="Box" className="error" />
                </Box>
                <Box >
                  <label >Full Name</label>
                  <Input
                    placeholder="Full Name"
                    fullWidth={true}
                    type="text"
                    name='name'
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.name}
                    disableUnderline
                  />
                   <ErrorMessage name="name" component="Box" className="error" />
                </Box>
                <Box >
                  <label >Mobile Number</label>
                  <Input
                    placeholder="Mobile Number"
                    fullWidth={true}
                    type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.mobile_number}
                    name='mobile_number'
                    disableUnderline
                  />
                   <ErrorMessage name="mobile_number" component="Box" className="error" />
                </Box>
                <Box >
                  <label >
                    Official Email Address
                  </label>
                  <Input
                    placeholder="Official Email Address"
                    fullWidth={true}
                    name='official_email_address'
                    onChange={handleChange} onBlur={handleBlur}
                    type="text"
                    value={values.official_email_address}
                    disableUnderline
                  />
                   <ErrorMessage name="official_email_address" component="Box" className="error" />
                </Box>
                <Box >
                  <label >
                    Personal Email Address
                  </label>
                  <Input
                    placeholder="Personal Email Address"
                    fullWidth={true}
                    type="text"
                    onChange={handleChange} onBlur={handleBlur}
                    value={values.personal_email_address}
                    name='personal_email_address'
                    disableUnderline
                  />
                  <ErrorMessage name="personal_email_address" component="Box" className="error" />
                </Box>
                <Box >
                  <label >Gender</label>
                  <Box >
                    <Button
                      variant="outlined"
                      data-test-id="male"
                      onClick={() => setFieldValue('gender', 'male')}
                    >
                      <i>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19.9892 0.725911C19.9801 0.654094 19.9642 0.58492 19.9379 0.52002C19.9371 0.518392 19.9371 0.516154 19.9367 0.51412L19.9359 0.512899C19.907 0.444539 19.8676 0.382487 19.823 0.32491C19.812 0.311279 19.8012 0.297852 19.7896 0.285034C19.742 0.231323 19.6903 0.181681 19.6303 0.141195C19.6287 0.139974 19.6267 0.139567 19.625 0.138346C19.5671 0.100098 19.503 0.0712077 19.4358 0.0484212C19.4191 0.0425211 19.4029 0.0374349 19.3858 0.032959C19.3154 0.0138346 19.243 0 19.1667 0H13.3333C12.8733 0 12.5 0.373332 12.5 0.833333C12.5 1.29334 12.8733 1.66667 13.3333 1.66667H17.1545L12.1808 6.64042C10.8545 5.57963 9.2216 5 7.5 5C3.36466 5 0 8.36467 0 12.5C0 16.6353 3.36466 20 7.5 20C11.6353 20 15 16.6353 15 12.5C15 10.7792 14.4208 9.14673 13.3592 7.81921L18.3333 2.84505V6.66667C18.3333 7.12667 18.7067 7.5 19.1667 7.5C19.6267 7.5 20 7.12667 20 6.66667V0.833333C20 0.815837 19.9959 0.799154 19.9949 0.782064C19.9937 0.76294 19.9917 0.744629 19.9892 0.725911ZM7.5 18.3333C4.28324 18.3333 1.66667 15.7168 1.66667 12.5C1.66667 9.28324 4.28324 6.66667 7.5 6.66667C9.05741 6.66667 10.5237 7.27295 11.6262 8.37158C12.7271 9.47632 13.3333 10.9426 13.3333 12.5C13.3333 15.7168 10.7168 18.3333 7.5 18.3333Z" />
                        </svg>
                      </i>
                      Male
                    </Button>
                    <Button
                      variant="outlined"
                      data-test-id="female"
                      onClick={() => setFieldValue('gender', 'female')}
                    >
                      <i>
                        <svg
                          width="14"
                          height="20"
                          viewBox="0 0 14 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5243 11.3349C14.1572 8.74534 14.1572 4.53178 11.5243 1.94221C8.89149 -0.647403 4.60754 -0.647403 1.97464 1.94221C-0.658215 4.53178 -0.658215 8.74534 1.97464 11.3349C3.0891 12.431 4.49939 13.063 5.95502 13.2312V15.4548H4.36619C3.92743 15.4548 3.57177 15.8046 3.57177 16.2362C3.57177 16.6677 3.92743 17.0175 4.36619 17.0175H5.95502V19.2186C5.95506 19.6502 6.31072 20 6.74951 20C7.18827 20 7.54393 19.6502 7.54393 19.2186V17.0175H9.1328C9.57156 17.0175 9.92722 16.6677 9.92722 16.2362C9.92722 15.8046 9.57156 15.4548 9.1328 15.4548H7.54393V13.2313C8.9996 13.063 10.4099 12.431 11.5243 11.3349ZM3.09816 10.2299C1.08478 8.2496 1.08478 5.02749 3.09816 3.04721C5.11149 1.06701 8.38742 1.0669 10.4009 3.04721C12.4142 5.02749 12.4142 8.2496 10.4009 10.2299C8.3875 12.2101 5.11153 12.2101 3.09816 10.2299Z"
                            fill="#A1A1A1"
                          />
                        </svg>
                      </i>
                      Female
                    </Button>
                    <Button
                      variant="outlined"
                      data-test-id="non_binary"
                      onClick={() => setFieldValue('gender', 'non_binary')}
                    >
                      <i>
                        <svg
                          width="14"
                          height="20"
                          viewBox="0 0 14 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.4233 6.10384V4.34388L8.96779 5.25069C9.05891 5.30421 9.1584 5.32963 9.25659 5.32963C9.45658 5.32963 9.65109 5.22406 9.75826 5.03527C9.91809 4.75382 9.82326 4.3939 9.54646 4.2314L8.00198 3.32458L9.54646 2.41777C9.82326 2.25527 9.91809 1.89535 9.75826 1.6139C9.59843 1.33241 9.24455 1.23605 8.96779 1.39851L7.4233 2.30533V0.588485C7.4233 0.263484 7.16421 0 6.84462 0C6.52504 0 6.26595 0.263484 6.26595 0.588485V2.30533L4.72146 1.39851C4.44466 1.23597 4.09074 1.33241 3.93099 1.6139C3.77116 1.89535 3.86598 2.25527 4.14278 2.41777L5.68727 3.32458L4.14278 4.2314C3.86598 4.3939 3.77116 4.75382 3.93099 5.03527C4.03816 5.22406 4.23267 5.32963 4.43266 5.32963C4.53084 5.32963 4.63034 5.30421 4.72146 5.25069L6.26595 4.34388V6.10384C2.76164 6.40365 0 9.39947 0 13.0394C0 16.8775 3.0705 20 6.84462 20C10.6188 20 13.6892 16.8775 13.6892 13.0394C13.6892 9.39947 10.9276 6.40365 7.4233 6.10384ZM6.84462 18.823C3.70866 18.823 1.15735 16.2285 1.15735 13.0394C1.15735 9.85025 3.70866 7.2557 6.84462 7.2557C9.98059 7.2557 12.5319 9.85025 12.5319 13.0394C12.5319 16.2285 9.98059 18.823 6.84462 18.823Z"
                            fill="#A1A1A1"
                          />
                        </svg>
                      </i>
                      Non Binary
                    </Button>
                    <Button
                      variant="outlined"
                      data-test-id="others"
                      onClick={() => setFieldValue('gender', 'others')}
                    >
                      <i>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2149_96952)">
                            <path
                              d="M17.2656 0C15.7579 0 14.5312 1.22664 14.5312 2.73438C14.5312 3.20469 14.6507 3.64758 14.8607 4.03449L10.7492 8.14594C9.61805 7.25262 8.19055 6.71875 6.64062 6.71875C2.97898 6.71875 0 9.69773 0 13.3594C0 17.021 2.97898 20 6.64062 20C10.3023 20 13.2812 17.021 13.2812 13.3594C13.2812 11.8095 12.7474 10.382 11.8541 9.25082L15.9655 5.13937C16.3524 5.34934 16.7953 5.46875 17.2656 5.46875C18.7734 5.46875 20 4.24211 20 2.73438C20 1.22664 18.7734 0 17.2656 0ZM6.64062 18.4375C3.84051 18.4375 1.5625 16.1595 1.5625 13.3594C1.5625 10.5593 3.84051 8.28125 6.64062 8.28125C9.44074 8.28125 11.7188 10.5593 11.7188 13.3594C11.7188 16.1595 9.44074 18.4375 6.64062 18.4375ZM17.2656 3.90625C16.6195 3.90625 16.0938 3.38055 16.0938 2.73438C16.0938 2.0882 16.6195 1.5625 17.2656 1.5625C17.9118 1.5625 18.4375 2.0882 18.4375 2.73438C18.4375 3.38055 17.9118 3.90625 17.2656 3.90625Z"
                              fill="#A1A1A1"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2149_96952">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </i>
                      Others
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <label >Date of Birth</label>
                  <Box >
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={values.dob}
                      name='dob'
                      data-test-id="dob"
                      wrapperClassName="date-picker"
                      data-testId="date-picker-inline-todate"
                      dayClassName={() => "example-datepicker-day-class"}
                      popperClassName="example-datepicker-class"
                      todayButton="TODAY"
                      onChange={(date) => setFieldValue("dob", date)}
                      onBlur={handleBlur}
                      maxDate={new Date()}
                    />
                    <ErrorMessage name="dob" component="Box" className="error" />
                  </Box>
                </Box>

                <Box >
                  <label >Password</label>
                  <Input
                    placeholder="Password"
                    value={values.password}
                    fullWidth={true}
                    type="text"
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disableUnderline
                  />
                   <ErrorMessage name="password" component="Box" className="error" />
                </Box>

                <Button type="submit" variant="contained">Sign Up</Button>
              </Box>
                           </>


                            
                            <DialogActions>
                                <Button onClick={this.props.close}>cancel</Button>
                                <Button type="submit" autoFocus>
                                    Submit
                                </Button>
                            </DialogActions>

                        </Form>
                    )}
                </Formik>
            </Dialog>
        </React.Fragment>
    )
  }
}

export default ConfirmDialog
