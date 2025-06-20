// src/components/kanban/TicketCard.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TicketCard = ({ ticket, index }) => (
  <Draggable draggableId={String(ticket.id)} index={index}>
    {(provided) => (
      <div
        className="bg-blue-50 rounded shadow-sm p-3 mb-3 border-l-4 border-blue-500"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-md font-semibold truncate">{ticket.title}</h4>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              ticket.priority === 'HIGH'
                ? 'bg-red-100 text-red-600'
                : ticket.priority === 'MEDIUM'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {ticket.priority}
          </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{ticket.description}</p>
      </div>
    )}
  </Draggable>
);

export default TicketCard;
