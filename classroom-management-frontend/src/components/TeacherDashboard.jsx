import { useState, useEffect } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    className: "11th",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const response = await axios.get("/api/assignments/teacher", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setAssignments(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleCreateAssignment = async () => {
    await axios.post("/api/assignments/create", newAssignment, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchAssignments();
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <div>
        <h3>Create New Assignment</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newAssignment.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={newAssignment.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newAssignment.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Class</label>
            <select
              name="className"
              value={newAssignment.className}
              onChange={handleInputChange}
            >
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
          </div>
          <button onClick={handleCreateAssignment}>Create Assignment</button>
        </form>
      </div>
      <div>
        <h3>Assignments</h3>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              {assignment.title} - {assignment.className} - {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
