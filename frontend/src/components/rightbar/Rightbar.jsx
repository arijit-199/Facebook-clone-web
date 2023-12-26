import "./rightbar.scss";
import UserImage from "../../images/registerbackground.jpg";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <span>John Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <span>John Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <p>
                <span>John Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <p>
                <span>John Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <p>
                <span>John Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <p>
                <span>John Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Other friends</span>

          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <div className="online"></div>
              <span>John Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <div className="online"></div>
              <span>John Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <div className="online"></div>
              <span>John Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <div className="online"></div>
              <span>John Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={UserImage} alt="" />
              <div className="online"></div>
              <span>John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar