import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UsersView = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };

  return (
    <>
      <h1 className="text-center ">Users</h1>
      <div className="container">
        <h2 className="dispaly-1  text-center text-danger my-4">
          User Id:{id}
        </h2>
        <hr />
        <Link to="/" className="btn btn-warning text-white">
          Back to home
        </Link>
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="border">
              <ul className="list-group">
                <li className="list-group-item">Name:{user.name}</li>
                <li className="list-group-item">User Name:{user.username}</li>
                <li className="list-group-item">Email:{user.email}</li>
                <li className="list-group-item">Phone:{user.phone}</li>
                <li className="list-group-item">Website:{user.website}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersView;
