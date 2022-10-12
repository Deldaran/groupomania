import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/list" replace />;
  }

  return (
    <div>
        pages={[
          { label: "Login", path: "/" }
        ]}
      {outlet}
    </div>
  );
};