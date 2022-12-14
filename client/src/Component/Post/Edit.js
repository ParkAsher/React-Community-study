import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UploadButtonDiv, UploadDiv, UploadForm } from '../../Style/UploadCss';
import ImageUpload from './ImageUpload';
import { Button } from 'react-bootstrap';

function Edit() {

    let params = useParams();
    let navigate = useNavigate();

    const [PostInfo, setPostInfo] = useState({}) // object type
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState("");

    useEffect(() => {

        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body).then((res) => {

            if (res.data.success) {
                setPostInfo(res.data.post)
            }

        }).catch((err) => {
            console.log(err)
        })

    }, [params.postNum])

    // 본래 가지고있던 제목과 글을 들고오는 useEffect
    useEffect(() => {

        setTitle(PostInfo.title);
        setContent(PostInfo.content);
        setImage(PostInfo.image);

    }, [PostInfo])


    // 이미 upload된 이미지 삭제
    const DeleteUploaded = (e) => {
        setImage("");
    }

    const onSubmit = (e) => {

        e.preventDefault();


        if (Title === "" || Content === "") {
            return alert("모든 항목을 채워주세요!")
        }

        let body = {

            title: Title,
            content: Content,
            image: Image,
            postNum: params.postNum
        }

        axios.post("/api/post/edit", body).then((res) => {

            if (res.data.success) {
                alert("글 수정이 완료되었습니다.")
                navigate(`/post/${params.postNum}`);
            } else {
                alert("글 수정이 실패하였습니다.")
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <UploadDiv>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input id='title' type="text" value={Title} onChange={(event) => { setTitle(event.currentTarget.value) }}></input>
                <ImageUpload setImage={setImage}></ImageUpload>
                {
                    Image ?
                        <div className='uploadedList'>
                            <div><p>Upload : {Image}</p></div>
                            <Button variant='danger' onClick={(e) => DeleteUploaded(e)}>x</Button>
                        </div>
                        : null
                }
                <label htmlFor='content'>내용</label>
                <textarea id="content" value={Content} onChange={(event) => { setContent(event.currentTarget.value) }}></textarea>
                <UploadButtonDiv>
                    <button className='cancel' onClick={(e) => { e.preventDefault(); navigate(-1); }}>취소</button>
                    <button onClick={(e) => { onSubmit(e) }}>제출</button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Edit