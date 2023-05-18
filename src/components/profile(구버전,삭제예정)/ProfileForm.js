import React from 'react';
import styled from 'styled-components';

const ProfileFormBlock=styled.div`
position: absolute;
left: 50%;
top: 100px;
bottom: 10%;
right: 75%;
justify-content: center;
aligh-items: center;
`;
const ProfileForm=({children})=>{
    return (
        <ProfileFormBlock>
        </ProfileFormBlock>
    );
};

export default ProfileForm;