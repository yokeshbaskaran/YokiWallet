import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const { handleLogout } = useAppContext();

  return (
    <div>
      <button
        onClick={handleLogout}
        className="p-2 text-white bg-red-700 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
