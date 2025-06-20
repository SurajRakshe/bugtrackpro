import React, { useEffect, useState } from 'react';
import axios from '../api'; // axios instance with baseURL and token already configured

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      alert('Error loading projects');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/projects/${editingId}`, form);
      } else {
        await axios.post('/projects', form);
      }
      setForm({ title: '', description: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Failed to delete project:', err);
        alert('Error deleting project');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🗂️ Project Manager</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          className="form-control mb-2"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>📌 Title</th>
            <th>📝 Description</th>
            <th>👥 Members</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td>{proj.title}</td>
              <td>{proj.description}</td>
              <td>{proj.members?.map((m) => m.name).join(', ') || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(proj)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(proj.id)}
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

export default ProjectTable;
