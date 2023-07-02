import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitails } from '../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar circle {...avatarProps}>
      {getNameInitails(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
