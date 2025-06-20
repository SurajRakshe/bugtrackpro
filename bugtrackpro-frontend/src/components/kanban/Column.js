// src/components/kanban/Column.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';

const Column = ({ columnId, tickets, title }) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="bg-white rounded shadow p-2 min-h-[300px] max-h-[80vh] overflow-y-auto"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tickets.map((ticket, index) => (
            <TicketCard key={ticket.id} ticket={ticket} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;
