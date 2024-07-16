import { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [submission, setSubmission] = useState({
    assignmentId: "",
    submissionText: "",
    attachmentUrl: "",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const response = await axios.get(
      `/api/assignments/class/${submission.className}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setAssignments(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission({ ...submission, [name]: value });
  };

  const handleSubmitAssignment = async () => {
    await axios.post("/api/submissions/submit", submission, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchAssignments();
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div>
        <h3>Submit Assignment</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Assignment</label>
            <select
              name="assignmentId"
              value={submission.assignmentId}
              onChange={handleInputChange}
            >
              {assignments.map((assignment) => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Submission Text</label>
            <textarea
              name="submissionText"
              value={submission.submissionText}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label>Attachment URL</label>
            <input
              type="text"
              name="attachmentUrl"
              value={submission.attachmentUrl}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSubmitAssignment}>Submit Assignment</button>
        </form>
      </div>
      <div>
        <h3>Assignments</h3>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              {assignment.title} - {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
