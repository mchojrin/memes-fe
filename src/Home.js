import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memesUrls, setMemesUrls] = useState([]);

  useEffect(() => {
    console.log('Looking for memes');

    const pictures = axios.get('http://localhost:4000/memes/').then(response => {
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
      <img src={image} className='Meme' />
      <hr />
    </article>
  );

  return <div>
    <h2>Home</h2>
    <p>Welcome to the meme's site.</p>
    <br/>
    <section class="pictures_list">
      {imageElements.length > 0 ? imageElements : "We don't currently have any memes :("}
    </section> 
  </div>
}

export default Home;