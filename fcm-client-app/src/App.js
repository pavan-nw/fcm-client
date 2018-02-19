import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firbaseApp from './lib/firebase-config';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import { Button } from 'primereact/components/button/Button';
import { Message } from 'primereact/components/message/Message';
import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion';
const messaging = firbaseApp.messaging();
const accordionTabList = [];

class App extends Component {

  constructor() {
    super();
    this.state = {
      status: 'info',
      message: 'Token will be displayed here..!',
      title: 'Notifications will appear here..!',
      msgCount: 'Notification Count: 0',
      accordionTabs: []
    }
    this.getToken = this.getToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBgCb = this.handleBgCb.bind(this);
  }

  handleBgCb(payload) {
    console.log(payload);
    const payloadMsg = JSON.stringify(payload);

    const accordionTab = <AccordionTab header={payload.notification.title}>
      {payloadMsg}
      </AccordionTab>;

      accordionTabList.push(accordionTab);

      this.setState(...this.state, { accordionTabs: accordionTabList, msgCount: `Notification Count: ${accordionTabList.length}` });

  }


  handleClick() {

    console.log(messaging);

    // messaging.setBackgroundMessageHandler(this.handleBgCb);

    messaging.onMessage(this.handleBgCb);

    messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        messaging.getToken()
          .then(currentToken => {
            if (currentToken) {
              console.log('Token generated is ', currentToken);
              this.setState(...this.state, { status: 'success',
message: currentToken });
              // sendTokenToServer(currentToken);
              // updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              this.setState(...this.state, { status: 'error',
message: 'No Instance ID token available. Request permission to generate one.' });

              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
            }
          })
          .catch(err => {
            console.log('An error occurred while retrieving token. ', err);
            this.setState(...this.state, { status: 'error',
message: 'An error occurred while retrieving token.' });

            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
          });

      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  getToken() {

  }

  render() {
    const appName = "Welcome to Firebase Client App"
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{appName}</h1>
        </header>
        <p className="App-intro">
          To get refresh token, click on <code>Generate Token</code> and send this to app Server.
        </p>
        <div>
          <Button label="Generate Token" onClick={this.handleClick} />
        </div>;
        <div>
          <Message severity={this.state.status} text={this.state.message}></Message>
        </div>;
        <div>
          <Message severity="warn" text={this.state.msgCount}></Message>
        </div>;
      </div>
      <Accordion multiple>
          {this.state.accordionTabs}
          </Accordion>
      </div>
    );
  }
}

export default App;
