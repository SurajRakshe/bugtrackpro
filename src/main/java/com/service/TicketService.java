package com.service;

import java.util.List;

import com.dto.TicketDTO;

public interface TicketService {

	TicketDTO createTicket(TicketDTO dto);

	TicketDTO getTicketById(Long id);

	List<TicketDTO> getTicketsByProjectId(Long projectId);

	TicketDTO updateTicket(Long id, TicketDTO dto);

	void deleteTicket(Long id);

	List<TicketDTO> filterTickets(String status, String priority, Long assigneeId, String keyword);
}
