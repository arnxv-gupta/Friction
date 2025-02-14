import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faHeadset, faCog } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const user = {
    name: "",
    picture: "", 
  };

  return (
    <div className="flex items-center bg-[#2B2D31] p-4 rounded-lg max-w-md">
      <img
        src={user.picture}
        alt="User"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-grow truncate ml-4 text-white text-lg font-medium">
        {user.name}
      </div>

      <div className="flex space-x-4 text-gray-400">
        <Link href="#">
          <FontAwesomeIcon icon={faMicrophone} size="lg" />
        </Link>
        <Link href="#">
          <FontAwesomeIcon icon={faHeadset} size="lg" />
        </Link>
        <Link href="#">
          <FontAwesomeIcon icon={faCog} size="lg" />
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
