import React, { useContext } from 'react';
import "./stories.scss";
import img from "../../images/registerbackground.jpg";
import img2 from "../../images/loginbackground.avif";
import { AuthContext } from "../../context/auth/authContext";


const Stories = () => {

    const { currentUser } = useContext(AuthContext);

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: img2
        },
        {
            id: 2,
            name: "John Doe",
            img: img2
        },
        {
            id: 3,
            name: "John Doe",
            img: img2
        },
        {
            id: 4,
            name: "John Doe",
            img: img2
        }
    ]

    return (
        <div className='stories'>
            <div className="story">
                <img src={img} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories