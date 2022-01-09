import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div class="container align-items-center">

      <center>
        <div class="container align-items-center">
          <RegisterForm />
        </div>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Already have an account? Click here to login.
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
