import React, { useState } from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // handle click event of logout button
  const handleLogout = () => {
    console.log('Logging out');
    removeUserSession();
    console.log('Redirecting to login');
    navigate('/login');
  }

  axios.get('http://localhost:4000/memes/', {
    userid: user.id
  }).then(
    response => {
      setLoading(false);
      const memes = response.data;
      // navigate('/dashboard');
    }).catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else if (error.request) {
        setError(error.request);
      } else {
        setError(error.message);
      }
    });

  const pictures = [
    {
      name: 'first_pic',
      url: '/first.img'
    }
  ];

  const picturesItems = pictures.map((picture) =>
    <li><article class="picture">
      <img src={picture.url} alt={picture.name} />
    </article></li>
  );

  return (
    <div>
      Welcome {user.name}! <input type="button" onClick={handleLogout} value="Logout" />
      <hr />
      {picturesItems.length > 0 ? "Uploaded images" : "You haven't uploaded any pictures yet"}
      <section class="pictures_list">
        <ul>
          {picturesItems}
        </ul>
      </section>
      <p><a href="/Upload">Upload new picture</a></p>
    </div>
  );
}

export default Dashboard;