import React, {Component, createRef} from 'react';
import higherOrderComponent from "../Auth/HOC";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";


export class Dashboard extends Component<any,any> {
  private dateRef: any;
  constructor(props: any) {
    super(props);
    this.dateRef = createRef();

    this.state = {
      open: false,
      time: new Date().toLocaleTimeString(),
      showPassword: true
    }
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true
    })
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    })
  };

  updateTime = () => {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  };

  handleClickDatePicker = () => {
    this.dateRef.current.showPicker();
  };

  render() {
    setInterval(this.updateTime, 1000);
    return (
      <>
        <h1> {this.state.time}</h1>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
              id="standard-adornment-password"
              type={'date'}
              inputRef={this.dateRef}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        this.handleClickShowPassword();
                        this.handleClickDatePicker()
                      }}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
          />
        </FormControl>
      </>
    )
  }
}

export default higherOrderComponent(Dashboard)
