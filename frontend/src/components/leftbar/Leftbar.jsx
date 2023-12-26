import "./leftbar.scss";
import UserImage from "../../images/fantasy-3077928_640.jpg";
import groups from "../../images/icons8-groups-48.png";
import friends from "../../images/icons8-tag-friends-32.png";
import fundRaiser from "../../images/icons8-bounced-check-64.png";
import events from "../../images/icons8-calendar-100.png";
import memories from "../../images/icons8-clock-78.png";
import gallery from "../../images/icons8-gallery-34.png";
import marketplace from "../../images/icons8-marketplace-48.png";
import messages from "../../images/icons8-message-48.png";
import tutorials from "../../images/icons8-tutorial-48.png";
import courses from "../../images/icons8-tv-show-64.png";
import watch from "../../images/icons8-video-60.png";
import videos from "../../images/icons8-video-camera-48.png";
import gaming from "../../images/icons8-video-game-48.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";

const Leftbar = () => {

  const { currentUser } = useContext(AuthContext);

  return ( 
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={UserImage} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={marketplace} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />

        <p>Your shortcuts</p>
        <div className="menu">
          <div className="item">
            <img src={events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />

        <p>Others</p>
        <div className="menu">
          <div className="item">
            <img src={fundRaiser} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar