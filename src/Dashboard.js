import React, { useState, useEffect } from 'react';
import { getUser } from './Utils/Common';
import axios from 'axios';

function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const [error, setError] = useState(null);
  const [memesUrls, setMemesUrls] = useState([]);

  useEffect(() => {
    console.log('Looking for memes');

    const pictures = axios.get('http://localhost:4000/memes/', {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }).then(response => {
      setLoading(false);
      console.log('Got memes ' + response.data);
      setMemesUrls(response.data);
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
  }, []);

  const imageElements = memesUrls.map((image) =>
    <article>
      <a href={image} target="_blank"><img src={image} className='Meme' /></a>
      <hr />
    </article>
  );

  return (
    <div>
      <section class="pictures_list">
        <h2>{memesUrls.length > 0 ? "These are your pictures" : "You haven't uploaded any picture yet"}</h2>
        {imageElements}
      </section>
      <p><a href="/Upload">Upload new picture</a></p>
    </div>
  );
}

export default Dashboard;