import { useEffect } from "react";
import { useUserDetail } from "../hooks/useUserDetail";

function DashBoard() {
  const { user, error, loading, getuserDetail } = useUserDetail();

  useEffect(() => {
    getuserDetail();
  }, [getuserDetail]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && (
        <div>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Email: {user?.dateofbirth}</p>
          <img src={user?.profileImage} alt="" width="20" height="20" />
        </div>
      )}
    </div>
  );
}

export default DashBoard;
