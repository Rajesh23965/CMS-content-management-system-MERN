import { Link } from "react-router-dom";
export const AboutUs = () => {
  return (
    <div className="home">
      <h1>
        <Link to="/first">Home</Link>{" "}
      </h1>
    </div>
  );
};

export const OurAim = () => {
  return (
    <div className="home">
      <h1>
        <Link to="/second">Profile</Link>{" "}
      </h1>
    </div>
  );
};

export const OurVision = () => {
  return (
    <div className="home">
      <h1>
        <Link to="/third">Info</Link>{" "}
      </h1>
    </div>
  );
};
