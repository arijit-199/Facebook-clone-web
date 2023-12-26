import "./home.scss";
import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import Write from "../../components/write/Write";
import axios from "axios";


const Home = () => {

  return (
    <div className="home">
      <Stories />
      <Write />
      <Posts />
    </div>
  );
};

export default Home