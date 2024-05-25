import { useEffect, useState } from "react";
import { useUserDetail } from "../hooks/useUserDetail";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

function DashBoard() {
  const { user, getuserDetail, loading } = useUserDetail();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getuserDetail().then(() => setIsLoaded(true));
  }, [getuserDetail]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner extraAttributes="w-10 h-10" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("__token__");
    window.location.reload();
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <table className="w-full text-sm text-left rtl:text-right text-black border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 flex items-center">Profile Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Logout</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded && (
            <tr className="bg-white border-t border-gray-200">
              <td className="px-4 py-2">
                {user && user.profileImage && (
                  <img
                    src={user.profileImage}
                    className="rounded-full w-20 h-20"
                    alt="Profile"
                  />
                )}
              </td>
              <td className="px-4 py-2">{user?.name}</td>
              <td className="px-4 py-2">{user?.dateofbirth}</td>
              <td className="px-4 py-2">{user?.email}</td>
              <td className="px-4 py-2">
                <Button
                  text="Logout"
                  extraClassnames="bg-red-500 hover:bg-red-700"
                  onClick={handleLogout}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-">
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-l">
          Prev
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold">
          1
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold">
          2
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold">
          3
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-r">
          Next
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
