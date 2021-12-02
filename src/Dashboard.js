import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {
  const user = getUser();
  const navigate = useNavigate();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  }

  return (
    <div>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
