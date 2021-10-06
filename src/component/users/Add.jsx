import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
const Add = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  //destruct initial value of users
  const { name, username, email, phone, website } = user;

  const inputHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);
    history.push("/");
  };
  return (
    <>
      <h1 className="text-center">Add User</h1>
      <div className="container">
        <div className="row">
          <div className="col-10 m-auto">
            <div>
              <form onSubmit={(e) => onSubmit(e)}>
                <input
                  type="text"
                  className="form-control my-4"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => inputHandle(e)}
                  value={name}
                />
                <input
                  type="text"
                  className="form-control my-4"
                  placeholder="Enter User Name"
                  name="username"
                  onChange={(e) => inputHandle(e)}
                  value={username}
                />
                <input
                  type="email"
                  class="form-control my-4"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => inputHandle(e)}
                />

                <input
                  type="number"
                  class="form-control my-4"
                  onChange={(e) => inputHandle(e)}
                  placeholder="Enter Phone"
                  name="phone"
                  value={phone}
                />
                <input
                  type="text"
                  class="form-control my-4"
                  id="pwd"
                  placeholder="Enter website name"
                  name="website"
                  value={website}
                  onChange={(e) => inputHandle(e)}
                />

                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Add;
