import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';
import TicketFilter from "../components/TicketFilter"; // ✅ Import filter

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'LOW',
    status: 'TO_DO',
    projectId: '',
    assigneeId: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (form.projectId) {
      fetchTickets(form.projectId);
    }
  }, [form.projectId]);

  const fetchTickets = async (projectId) => {
    try {
      const res = await axios.get(`/tickets/project/${projectId}`);
      setTickets(res.data);
    } catch (err) {
      alert('Error fetching tickets');
    }
  };

  const fetchFiltered = async (filters) => {
    try {
      const params = new URLSearchParams(filters);
      const res = await axios.get(`/tickets/filter?${params.toString()}`);
      setFilteredTickets(res.data);
    } catch (err) {
      alert("Failed to filter tickets");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects');
      setProjects(res.data);
      if (res.data.length > 0) {
        setForm((prev) => ({ ...prev, projectId: res.data[0].id }));
        fetchTickets(res.data[0].id);
      }
    } catch (err) {
      alert('Error fetching projects');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/tickets/${editingId}`, form);
      } else {
        await axios.post('/tickets', form);
      }
      setForm({
        title: '',
        description: '',
        priority: 'LOW',
        status: 'TO_DO',
        projectId: form.projectId,
        assigneeId: '',
      });
      setEditingId(null);
      fetchTickets(form.projectId);
    } catch (err) {
      alert('Error saving ticket');
    }
  };

  const handleEdit = (ticket) => {
    setForm({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      projectId: ticket.projectId,
      assigneeId: ticket.assigneeId,
    });
    setEditingId(ticket.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await axios.delete(`/tickets/${id}`);
        fetchTickets(form.projectId);
      } catch {
        alert('Failed to delete ticket');
      }
    }
  };

  const displayedTickets = filteredTickets.length > 0 ? filteredTickets : tickets;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">🐞 Ticket Manager</h2>

      {/* 🔍 Ticket Filter Section */}
      <TicketFilter onFilter={fetchFiltered} users={users} />

      {/* 📝 Ticket Form */}
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
        <div className="mb-2">
          <input
            name="title"
            placeholder="Ticket Title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <textarea
            name="description"
            placeholder="Ticket Description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="row mb-2">
          <div className="col">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="col">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="TO_DO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="form-select"
              required
            >
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <select
              name="assigneeId"
              value={form.assigneeId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Assignee --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </form>

      {/* 🧾 Ticket Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
              </td>
              <td>
                <span
                  className={`badge bg-${
                    ticket.priority === 'HIGH'
                      ? 'danger'
                      : ticket.priority === 'MEDIUM'
                      ? 'warning'
                      : 'success'
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>
              <td>
                <span
                  className={`badge bg-${
                    ticket.status === 'DONE'
                      ? 'success'
                      : ticket.status === 'IN_PROGRESS'
                      ? 'info'
                      : 'secondary'
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td>
                {users.find((u) => u.id === ticket.assigneeId)?.name || 'N/A'}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(ticket)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
