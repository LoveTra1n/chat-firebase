import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false)

    const download = (input) =>{
        setChecked(true)
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const date = new Date().getTime();

            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {

                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        setChecked(false)
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Just Chatting :)</span>
                <span className="title">Регистрация</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="имя пользователя" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="пароль" />
                    <input required style={{ display: "none" }}
                           onChange={download}
                           type="file"
                           id="file" />
                    <label
                        htmlFor="file">
                        <img src={Add} alt="" />
                        {checked ?
                        <span>успешно загружено</span>:
                            <span>неверный формат файла</span>
                        }

                    </label>
                    <button disabled={loading}>создать аккаунт</button>
                    {loading && "создание аккаунта..."}
                    {err && <span>ой,попробуйте ещё раз</span>}
                </form>
                <p>
                    У вас уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;