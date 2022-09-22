import React from 'react';
import { Alert } from 'antd';

import './error-message.css';
import errorServer from './error-server.png';
import errorConnection from './error-connection.png';

function ErrorMessage({ error }) {
  return error.connection ? <ErrorConnection /> : <ErrorServer errorMessage={error.message} />;
}

function ErrorServer({ errorMessage }) {
  return (
    <div className="error-message">
      <Alert
        message={`Server unavailable. ${errorMessage}`}
        description="We are already trying to fix everything as soon as possible."
        type="error"
        showIcon
      />
      <img src={errorServer} alt="error" />
    </div>
  );
}

function ErrorConnection() {
  return (
    <div className="error-message">
      <Alert
        message="Check your internet connection"
        description="We are missing you. Come back please"
        type="error"
        showIcon
      />
      <img src={errorConnection} alt="error" />
    </div>
  );
}

export default ErrorMessage;
