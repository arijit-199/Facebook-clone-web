import "./comments.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/authContext.js";
import { makeRequest } from "../../axios.js";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
  
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);

    const { isLoading, data } = useQuery({
        queryKey: ['comments'],
        queryFn: async () =>
            await makeRequest.get("/comments?postId=" + postId).then(
                (res) => {
                    return res.data;
                }
            ),
    });



    const mutation = useMutation({
        mutationFn: async () => {
            await makeRequest.post("/comments?postId=" + postId, { desc });
            setDesc("");
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
        }
    });

    const handleClick = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <div className='comments'>
            <div className="write">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <input type="text" placeholder="write a comment" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading
                ? "loading.."
                : data?.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={"/upload/" + comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className="date">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))}
        </div>
    )
}

export default Comments