import React from 'react'
import RepleUpload from './RepleUpload';
import RepleList from './RepleList';
import { useSelector } from 'react-redux';
import { RepleAreaDiv } from '../../Style/RepleCss';

function RepleArea(props) {

    const user = useSelector((state) => state.user);

    return (
        <RepleAreaDiv>
            {user.accessToken && <RepleUpload postId={props.postId}></RepleUpload>}
            <RepleList postId={props.postId}></RepleList>
        </RepleAreaDiv>
    )
}

export default RepleArea