import "./write.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import Gallery from "../../images/icons8-gallery-34.png";
import TagFriends from "../../images/icons8-tag-friends-64.png";
import Location from "../../images/placeholder.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import UserImage from "../../images/fantasy-3077928_640.jpg";


const Write = () => {

    const { currentUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload/files", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest.post("/posts", newPost);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });


    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ desc, img: imgUrl });
        queryClient.invalidateQueries(['posts']);
        setDesc("");
        setFile(null);
    };

    return (
        <div className="write">
            <div className="container">
                <div className="user">
                    <div className="left">
                        <img src={UserImage} alt="" />
                        <input
                            rows={4}
                            type="text"
                            name="desc"
                            value={desc}
                            placeholder="What's on your mind?"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="right">
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
                    </div>
                </div>
                <div className="buttons">
                    <div className="customButton">
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="file">
                            <div className="button">
                                <img src={Gallery} alt="" />
                                <span>Add Image</span>
                            </div>

                        </label>
                        <div className="button">
                            <img src={Location} alt="" />
                            <span>Add Location</span>
                        </div>
                        <div className="button">
                            <img src={TagFriends} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <button onClick={handleClick}>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Write