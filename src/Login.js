import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';


class Login extends React.Component {

  render() {
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Body>
        
          {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
          <LoginButton/>
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
