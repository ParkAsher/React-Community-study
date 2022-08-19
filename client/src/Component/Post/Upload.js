import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadButtonDiv, UploadDiv, UploadForm, } from '../../Style/UploadCss.js';
import ImageUpload from './ImageUpload.js';
import axios from 'axios'

function Upload(props) {

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    /*
        image
    */
    const [Image, setImage] = useState("");

    let navigate = useNavigate();

    const onSubmit = (e) => {

        e.preventDefault();


        if (Title === "" || Content === "") {
            return alert("모든 항목을 채워주세요!")
        }

        let body = {

            title: Title,
            content: Content,
            image: Image
        }

        axios.post("/api/post/submit", body).then((res) => {

            if (res.data.success) {
                alert("글 작성이 완료되었습니다.")
                navigate("/");
            } else {
                alert("글 작성이 실패하였습니다.")
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    /*
        useEffect

        [] : useEffect가 실행될 조건 (빈 배열일때는 실행되거나 죽을때 딱 한번만 실행)
    */

    /*
        useEffect(() => {
            console.log("Content가 바뀌었습니다.");
        }, [Content]);
    */

    return (
        <UploadDiv>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input id='title' type="text" value={Title} onChange={(event) => { setTitle(event.currentTarget.value) }}></input>
                <ImageUpload setImage={setImage}></ImageUpload>
                <label htmlFor='content'>내용</label>
                <textarea id="content" value={Content} onChange={(event) => { setContent(event.currentTarget.value) }}></textarea>
                <UploadButtonDiv>
                    <button onClick={(e) => { onSubmit(e) }}>제출</button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload