import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import CommentSection from '../components/comments/CommentSection';

function TicketDetails() {
  const { id } = useParams(); // ticket ID from URL
  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState({ name: '' }); // get this from auth context or localStorage

  useEffect(() => {
    API.get(`/api/tickets/${id}`).then(res => setTicket(res.data));
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="ticket-details">
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>

      {/* ✅ Add comment section here */}
      <CommentSection ticketId={ticket.id} currentUser={user.name} />
    </div>
  );
}

export default TicketDetails;
