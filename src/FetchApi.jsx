import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetch = () => {
  //useState for getData
  const [dataList, setDataList] = useState([]);

  //add input useState
  const [input, setInput] = useState({
    uname: "",
    email: "",
    date: "",
    designation: "",
    salary: "",
  });
  //edit input useState
  const [EditInput, setEditInput] = useState({
    uname: "",
    email: "",
    date: "",
    designation: "",
    salary: "",
    employee_id: "",
  });

  // useEffect(() => {
  //   fetch("http://192.168.1.11:3005/api/employee")
  //     .then((response) => response.json())
  //     .then((data) => setDataList(data));
  // }, []);

  //get data using axios

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.1.4:3005/api/employee");
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((input) => {
      return {
        ...input,
        [name]: value,
      };
    });
  };

  //EdithandleInput
  const EdithandleInput = (e) => {
    const e_name = e.target.name;
    const e_value = e.target.value;

    setEditInput({ ...EditInput, [e_name]: e_value });
  };
  //EditFeildsButton
  const EditFields = async (e, e_id) => {
    e.preventDefault();
    console.log(EditInput);

    try {
      const res = await axios.put(
        `http://192.168.1.4:3005/api/employee/${e_id}`,
        {
          name: EditInput.uname,
          email: EditInput.email,
          designation: EditInput.designation,
          salary: EditInput.salary,
          dateOfJoining: EditInput.date,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //submit form
  const submitForm = (e) => {
    e.preventDefault();
    if (
      input.uname === "" ||
      input.email === "" ||
      input.salary === "" ||
      input.designation === "" ||
      input.date === ""
    ) {
      alert("Please fill all value");
    } else {
      axios
        .post("http://192.168.1.4:3005/api/employee", {
          name: input.uname,
          email: input.email,
          salary: input.salary,
          designation: input.designation,
          dateOfJoining: input.date,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    alert("Yours data has submitted successfully!");
  };

  //delete data using promise

  // const deleteData = (e_id) => {
  //   axios
  //     .delete(`http://192.168.1.4:3005/api/employee/${e_id}`)
  //     .then(() => {
  //       console.log("deleted");
  //       const updatedList = [...dataList];
  //       setDataList(updatedList.filter((item) => item.employee_id !== e_id));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //delete data using async await

  const deleteData = async (e_id) => {
    try {
      await axios.delete(`http://192.168.1.4:3005/api/employee/${e_id}`);
      const updatedList = [...dataList];
      setDataList(updatedList.filter((item) => item.employee_id !== e_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto mt-5">
            <button
              class="btn btn-success mb-4"
              data-toggle="modal"
              data-target="#myModal"
            >
              Add Employee
            </button>
            <table className="table table-borderd table-striped">
              <thead>
                <th>Name</th>
                <th>Designation</th>
                <th>Salery</th>
                <th>Email</th>
                <th>Action</th>
              </thead>
              {dataList.map(
                ({
                  employee_id,
                  name,
                  designation,
                  salary,
                  email,
                  dateOfJoining,
                }) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{name}</td>
                        <td>{designation}</td>
                        <td>{salary}</td>
                        <td>{email}</td>
                        <td>{dateOfJoining}</td>
                        <button
                          class="btn btn-primary"
                          data-target="#myModal2"
                          data-toggle="modal"
                          onClick={() =>
                            setEditInput({
                              employee_id,
                              uname: name,
                              designation,
                              salary,
                              email,
                              date: dateOfJoining,
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteData(employee_id)}
                        >
                          Delete
                        </button>
                      </tr>
                    </tbody>
                  );
                }
              )}
            </table>
          </div>
        </div>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <form onSubmit={submitForm}>
                  <label> Name</label>
                  <input
                    type="text"
                    name="uname"
                    onChange={handleInput}
                    value={input.value}
                  />
                  <label> Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={input.value}
                  />
                  <label> Designation</label>
                  <input
                    type="text"
                    name="designation"
                    onChange={handleInput}
                    value={input.value}
                  />
                  <label> Salary</label>
                  <input
                    type="text"
                    name="salary"
                    onChange={handleInput}
                    value={input.value}
                  />
                  <label>Date of joining</label>
                  <input
                    type="number"
                    name="date"
                    onChange={handleInput}
                    value={input.value}
                  />
                  <button type="submit">Add</button>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="myModal2">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <form>
                  <label> Name</label>
                  <input
                    type="text"
                    name="uname"
                    onChange={EdithandleInput}
                    value={EditInput.uname}
                  />
                  <label> Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={EdithandleInput}
                    value={EditInput.email}
                  />
                  <label> Designation</label>
                  <input
                    type="text"
                    name="designation"
                    onChange={EdithandleInput}
                    value={EditInput.designation}
                  />
                  <label> Salary</label>
                  <input
                    type="text"
                    name="salary"
                    onChange={EdithandleInput}
                    value={EditInput.salary}
                  />
                  <label>Date of joining</label>
                  <input
                    type="number"
                    name="date"
                    onChange={EdithandleInput}
                    value={EditInput.date}
                  />
                  <button
                    type="submit"
                    onClick={(e) => EditFields(e, EditInput.employee_id)}
                  >
                    Save
                  </button>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fetch;
