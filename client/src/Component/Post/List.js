import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ListDiv, ListItem } from '../../Style/ListCss';
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar';

function List(props) {

    const [PostList, setPostList] = useState([]);

    useEffect(() => {

        axios.post("/api/post/list").then((res) => {

            if (res.data.success) {
                setPostList([...res.data.postList])
            }

        }).catch((err) => {

            console.log(err);
        })

    }, []);

    return (
        <ListDiv>
            {PostList.map((post, idx) => {
                return (
                    <ListItem key={idx}>
                        <Link to={`/post/${post.postNum}`}>
                            <p className='title'>{post.title}</p>
                            <p className='author'>
                                {post.author.displayName}
                            </p>
                            <p>{post.content}</p>
                        </Link>
                    </ListItem>
                );
            })}
        </ListDiv>
    )
}

export default List