import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateStudent from "./CreateStudent";

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(e));
  });

  const handleDelete= async(id)=> {
    

    try {
      await axios.delete("http://localhost:8081/delete/" + id);
      alert("Deleted id:" + id);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded">
        <Link to="/create" className="btn btn-success">
          Add+
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* data to be printed here from database API */}

            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>
                  <Link to={`/update/${data.ID}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleDelete(data.ID)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
