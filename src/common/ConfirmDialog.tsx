import React, { Component } from 'react'
import {Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import axios from "axios";

let initialValues = {
    id: '',
  title : '',
  description : '',
  price : ''
};


export class ConfirmDialog extends Component<any,any> {

    constructor(props: any) {
        super(props);

        initialValues = {
            id: this.props.values.id,
            title: this.props.values.title,
            description: this.props.values.description,
            price: this.props.values.price,
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
            }
        }
    };

    close() {
       return this.props.close
    }

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
                            title: yup.string().required("please Enter Your Product Name")
                        })} onSubmit={values => {
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
                          handleSubmit
                      }) => (
                        <form onSubmit={handleSubmit}>
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
                            <DialogActions>
                                <Button onClick={this.props.close}>cancel</Button>
                                <Button type="submit" autoFocus>
                                    Submit
                                </Button>
                            </DialogActions>

                        </form>
                    )}
                </Formik>
            </Dialog>
        </React.Fragment>
    )
  }
}

export default ConfirmDialog
