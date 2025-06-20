// src/components/kanban/KanbanBoard.js
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import axios from '../../api';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);

  const columns = {
    TO_DO: { title: 'To Do' },
    IN_PROGRESS: { title: 'In Progress' },
    DONE: { title: 'Done' },
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/tickets/project/1'); // TODO: make projectId dynamic
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    }
  };

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    if (!destination || source.droppableId === destination.droppableId) return;

    const ticketId = parseInt(draggableId);
    const updatedTicket = tickets.find((t) => t.id === ticketId);
    if (!updatedTicket) return;

    updatedTicket.status = destination.droppableId;

    try {
      await axios.put(`/tickets/${ticketId}`, updatedTicket);
      fetchTickets();
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  const ticketsByStatus = (status) => tickets.filter((t) => t.status === status);

  return (
    <div className="flex flex-col lg:flex-row flex-wrap gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([status, data]) => (
          <Column
            key={status}
            columnId={status}
            title={data.title}
            tickets={ticketsByStatus(status)}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
