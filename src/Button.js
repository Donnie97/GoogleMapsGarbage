import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



export class Button extends Component {
    render() {
        return(
<MuiThemeProvider>
<RaisedButton label="Button Of Nothing" buttonStyle={{backgroundColor: 'grey'}} labelStyle={{color:'black'}}/>

</MuiThemeProvider>
        )
    }
}

export default Button;