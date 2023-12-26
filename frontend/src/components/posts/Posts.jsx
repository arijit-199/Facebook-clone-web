import "./posts.scss";
import Post from '../post/Post';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => makeRequest.get(userId !== undefined ? "/posts?userId=" + userId : "/posts").then((res) => {
      return res.data;
    })
  });


  return (
    <div className='posts'>
      {error ? "Something went wrong, please log in again!"
        : isLoading ? "Loading, please wait.."
          : data?.map((item) => (        
              <Post post={item} key={item.id}/>
          ))}
    </div>
  )
}

export default Posts