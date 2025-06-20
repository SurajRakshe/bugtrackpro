package com.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dto.TicketDTO;
import com.service.TicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor

public class TicketController {

	private final TicketService ticketService;

	@PostMapping
	public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO ticketDto) {
		return ResponseEntity.ok(ticketService.createTicket(ticketDto));
	}

	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("/project/{projectId}")
	public ResponseEntity<List<TicketDTO>> getTicketsByProject(@PathVariable Long projectId) {
		return ResponseEntity.ok(ticketService.getTicketsByProjectId(projectId));
	}

	@PutMapping("/{ticketId}")
	public ResponseEntity<TicketDTO> updateTicket(@PathVariable Long ticketId, @RequestBody TicketDTO ticketDto) {
		return ResponseEntity.ok(ticketService.updateTicket(ticketId, ticketDto));
	}

	@DeleteMapping("/{ticketId}")
	public ResponseEntity<String> deleteTicket(@PathVariable Long ticketId) {
		ticketService.deleteTicket(ticketId);
		return ResponseEntity.ok("Ticket deleted");
	}
	
	@GetMapping("/filter")
	public ResponseEntity<List<TicketDTO>> filterTickets(
	    @RequestParam(required = false) String status,
	    @RequestParam(required = false) String priority,
	    @RequestParam(required = false) Long assigneeId,
	    @RequestParam(required = false) String keyword
	) {
	    return ResponseEntity.ok(ticketService.filterTickets(status, priority, assigneeId, keyword));
	}

}