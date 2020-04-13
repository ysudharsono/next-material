import axios from 'axios';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { reauthenticate } from '../lib/redux/actions/authA';

const Whoami = ({ user }) => (
  <Layout title="Who Am I">
    {(user && (
      <div>
        <h2>Who am i</h2>
        {JSON.stringify(user)}
      </div>
    )) ||
      'Please sign in'}
  </Layout>
);

Whoami.getInitialProps = async (ctx) => {
  const { token } = ctx.store.getState().auth;
  if (token) {
    const response = await axios.get(`http://localhost:8080/api/user/5e9321e5ba09c55fb21e93cb`, {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    });
    const user = response.data;
    return {
      user,
    };
  }
};

export default connect((state) => state, { reauthenticate })(Whoami);
