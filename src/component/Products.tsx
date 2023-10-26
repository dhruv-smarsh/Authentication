import React, { Component } from 'react'
import PropTypes from 'prop-types'
import higherOrderComponent from "../Auth/HOC";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from "yup";
import ConfirmDialog from "../common/ConfirmDialog";
import { Navigate } from 'react-router-dom';

let initialValues = {
    id: '',
    title: '',
    description: '',
    price: '',
};

export class Products extends Component<any,any> {
  static propTypes = {

  }

  constructor(props: any) {
      super(props);

      this.state = {
          create: false,
          edit: false,
          values: {title: ''},
          productList: []
      }
  }

  componentDidMount(): void {
      this.getAllProducts();
  }

    getAllProducts() {
        let data = localStorage.getItem('token');
      axios.get('http://localhost:3000/products', {
          headers: {
              Authorization: `Bearer ${data}`
          }
      }).then((res: any) => {
          if (res.data.length) {
              this.setState({
                  productList: res.data
              });
          }
      }).catch((error) => {
          if (error.response.status === 401) {
              <Navigate replace  to="/login"/>
          }
      });
  }

  deleteProduct(id: number) {
      let data = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/products/${id}`, {
          headers: {
              Authorization: `Bearer ${data}`
          }
      }).then((res: any) => {
          // if (res.status === 200) {
              this.getAllProducts();
          // }
      })
  }

  formatDate (date: string) {
      const strSplitDate = String(date).split(' ');
      const date1 = new Date(strSplitDate[0]);
      return date1.getDate() + '-' + date1.getMonth() + '-' + date1.getFullYear();
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

    handleClose = (value: string) => {
      this.setState({
          create: false,
          edit: false,
          values: []
      });
        initialValues = {
            id: '',
            title: '',
            description: '',
            price: '',
        };
        this.getAllProducts();
    };

  render() {
    return (
        <>
            <div  className={`product-button`}>
                <h2>Products</h2>
                <Button onClick={() => this.openCreate('create')} variant="outlined"><AddIcon/></Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Created At&nbsp;(g)</TableCell>
                            <TableCell align="right">Updated At</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.productList.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{this.formatDate(row.created_at)}</TableCell>
                                <TableCell align="right">{(row.updated_at)}</TableCell>
                                <TableCell align="right">
                                    <ul style={{
                                        listStyle: "none"
                                    }}>
                                        <Button onClick={() => this.openCreate('edit', row)}>
                                            <li><EditIcon/></li>
                                        </Button>
                                        <Button onClick={() => this.deleteProduct(row.id)}>
                                            <li><DeleteIcon/></li>
                                        </Button>
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {(this.state.create || this.state.edit) && <ConfirmDialog mode={this.state.create ? 'create' : 'edit'} open={true} values={this.state.values}
            close={this.handleClose}/>}
        </>
    )
  }
}

export default higherOrderComponent(Products)
