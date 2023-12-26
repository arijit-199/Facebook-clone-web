import "./profile.scss";
//Icons
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Posts from "../../components/posts/Posts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/authContext.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import Update from "../../components/update/Update.jsx";

const Profile = () => {

  const [followers, setFollowers] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);

  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  // To get basic details of USER (e.g. city, website, etc).
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userId);
      return res.data;
    }
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => await makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  });


  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    }
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={"/upload/" + data?.coverPic} alt="" className="cover" />
        <img src={"/upload/" + data?.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <LocationOnIcon />
                <span>{data?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website}</span>
              </div>
            </div>
            <p>followed by {relationshipData?.length} people</p>
            {rIsLoading
              ? "Loading.."
              : userId === currentUser?.id
                ? <button onClick={() => setOpenUpdate(true)}>Update</button>
                : <button onClick={handleFollow}>{relationshipData?.includes(currentUser.id) ? "Unfollow" : "Follow"}</button>
            }
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}

export default Profile