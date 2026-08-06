import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const { handleLogout } = useAppContext();

  return (
    <section className="yoki min-h-screen mb-8 flex flex-col items-center gap-1">
      {/* 1. Header  */}

      <div className="my-3 flex flex-col items-center gap-1">
        <h2>Yokesh is here</h2>
        <div>
          <img
            src="/profile.png"
            alt="my-profile"
            width={200}
            height={200}
            className="w-50 yoki p-1 rounded-full"
          />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-5 py-2 text-white bg-red-700 rounded-md cursor-pointer"
      >
        Logout
      </button>
    </section>
  );
};

export default Profile;
