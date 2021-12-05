import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {
  const user = getUser();
  const navigate = useNavigate();

  // handle click event of logout button
  const handleLogout = () => {
    console.log('Logging out');
    removeUserSession();
    console.log('Redirecting to login');
    navigate('/login');
  }

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
      { picturesItems.length > 0 ? "Uploaded images" : "You haven't uploaded any pictures yet" }
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