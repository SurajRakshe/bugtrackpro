import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketFilter = ({ onFilter }) => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => setAssignees(res.data))
      .catch(err => console.error("Failed to fetch assignees", err));
  }, []);

  const handleFilter = () => {
    onFilter({ status, priority, assigneeId, keyword });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
      <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
        <option value="">All Status</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 rounded">
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="border p-2 rounded">
        <option value="">All Assignees</option>
        {assignees.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search tickets..."
          className="border p-2 rounded flex-grow"
        />
        <button onClick={handleFilter} className="bg-blue-600 text-white px-3 rounded">Search</button>
      </div>
    </div>
  );
};

export default TicketFilter;
