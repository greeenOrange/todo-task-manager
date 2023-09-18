import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [url, setUrl] =useState('');

  useEffect(() => {
    setUrl(localStorage.getItem('recent-image'));
}, [localStorage.getItem('recent-image')])

  const profileUser = JSON.parse(localStorage.getItem('user'));

  console.log( profileUser.name );
  return (
    <div>
        This is my Profile pro!
        <img src={url} alt="" />
    </div>
  )
}

export default Profile