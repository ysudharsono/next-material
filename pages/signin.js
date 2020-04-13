import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { authenticate } from '../lib/redux/actions/authA';

const Signin = ({ authenticate }) => {
  const [email, setEmail] = useState('senz17@gmail.com');
  const [password, setPassword] = useState('ZXas1qw12');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    authenticate(user);
  };

  return (
    <Layout title="Sign In">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </Layout>
  );
};

Signin.getInitialProps = (ctx) => {};

export default connect((state) => state, { authenticate })(Signin);
