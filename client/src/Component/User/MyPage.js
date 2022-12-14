import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import axios from 'axios';
import firebase from '../../firebase';

function MyPage() {

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const [CurrentImage, setCurrentImage] = useState("");

    useEffect(() => {

        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL);
        }

    }, [user])

    const ImageUpload = (e) => {

        var formData = new FormData();
        formData.append("file", e.target.files[0]);

        axios.post("/api/user/profile/image", formData).then((res) => {
            setCurrentImage(res.data.filePath);
        })

    }

    const SaveProfile = async (e) => {
        e.preventDefault();

        try {

            await firebase.auth().currentUser.updateProfile({
                photoURL: CurrentImage,
            })

        } catch (err) {

            return alert("프로필 저장에 실패하였습니다.");

        }


        let body = {
            photoURL: CurrentImage,
            uid: user.uid,
        }

        axios.post("/api/user/profile/update", body).then((res) => {

            if (res.data.success) {

                alert("프로필 저장에 성공했습니다.");
                window.location.reload();

            } else {

                alert("프로필 저장에 실패했습니다.");

            }

        })
    }


    return (
        <div>
            <form>
                <label>
                    <input type="file" style={{ display: "none" }} accept="image/*" onChange={(e) => ImageUpload(e)}></input>
                    <Avatar size='100' round={true} src={CurrentImage} style={{ cursor: "pointer" }}></Avatar>
                </label>
                <button onClick={(e) => SaveProfile(e)}>저장</button>
            </form>
        </div >
    )
}

export default MyPage