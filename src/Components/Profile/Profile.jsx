import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [url, setUrl] =useState('');

  useEffect(() => {
    setUrl(localStorage.getItem('recent-image'));
}, [localStorage.getItem('recent-image')])

  const profileUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
        <img src={url} alt={url} width="100" height="100" />
        This Profile is {profileUser?.name} !
    </div>
  )
}

export default Profile