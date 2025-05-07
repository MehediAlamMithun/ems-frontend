//Used Javascript, React Library
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";

const UseAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/users/admin/${user.email}`)
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
          setIsAdminLoading(false);
        })
        .catch(() => {
          setIsAdmin(false);
          setIsAdminLoading(false);
        });
    }
  }, [user, loading, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
