import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
  const [url, setUrl] =useState('');

  useEffect(() => {
    setUrl(localStorage.getItem('recent-image'));
}, [localStorage.getItem('recent-image')])

  const profileUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
        {url ?
        <img src={url} alt={url} width="100" height="100" />:
        <Link to="/login">login</Link>
        }
        {
          profileUser && 
          <p>This Profile is {profileUser?.name} !</p>
        }
    </div>
  )
}

export default Profile