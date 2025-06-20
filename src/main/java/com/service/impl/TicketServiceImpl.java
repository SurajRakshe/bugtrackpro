package com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dto.TicketDTO;
import com.entity.Project;
import com.entity.Ticket;
import com.entity.User;
import com.repository.ProjectRepository;
import com.repository.TicketRepository;
import com.repository.UserRepository;
import com.service.TicketService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

	private final TicketRepository ticketRepository;
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	// 🔁 Convert Entity to DTO
	private TicketDTO convertToDTO(Ticket ticket) {
		TicketDTO dto = new TicketDTO();
		dto.setId(ticket.getId());
		dto.setTitle(ticket.getTitle());
		dto.setDescription(ticket.getDescription());
		dto.setPriority(ticket.getPriority());
		dto.setStatus(ticket.getStatus());
		dto.setProjectId(ticket.getProject().getId());
		dto.setAssigneeId(ticket.getAssignee().getId());
		return dto;
	}

	// 🔁 Convert DTO to Entity (used in create/update)
	private Ticket convertToEntity(TicketDTO dto) {
		Ticket ticket = new Ticket();
		ticket.setTitle(dto.getTitle());
		ticket.setDescription(dto.getDescription());
		ticket.setPriority(dto.getPriority());
		ticket.setStatus(dto.getStatus());

		Project project = projectRepository.findById(dto.getProjectId())
				.orElseThrow(() -> new RuntimeException("Project not found"));
		User assignee = userRepository.findById(dto.getAssigneeId())
				.orElseThrow(() -> new RuntimeException("User not found"));

		ticket.setProject(project);
		ticket.setAssignee(assignee);

		return ticket;
	}

	// ✅ Create Ticket
	@Override
	public TicketDTO createTicket(TicketDTO dto) {
		Ticket ticket = convertToEntity(dto);
		Ticket saved = ticketRepository.save(ticket);
		return convertToDTO(saved);
	}

	// ✅ Get Ticket By ID
	@Override
	public TicketDTO getTicketById(Long id) {
		return ticketRepository.findById(id).map(this::convertToDTO)
				.orElseThrow(() -> new RuntimeException("Ticket not found"));
	}

	// ✅ Get All Tickets for a Project
	@Override
	public List<TicketDTO> getTicketsByProjectId(Long projectId) {
		return ticketRepository.findByProjectId(projectId).stream().map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	// ✅ Update Ticket
	@Override
	public TicketDTO updateTicket(Long id, TicketDTO dto) {
		Ticket ticket = ticketRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Ticket not found"));

		ticket.setTitle(dto.getTitle());
		ticket.setDescription(dto.getDescription());
		ticket.setPriority(dto.getPriority());
		ticket.setStatus(dto.getStatus());

		if (dto.getProjectId() != null) {
			Project project = projectRepository.findById(dto.getProjectId())
					.orElseThrow(() -> new RuntimeException("Project not found"));
			ticket.setProject(project);
		}

		if (dto.getAssigneeId() != null) {
			User assignee = userRepository.findById(dto.getAssigneeId())
					.orElseThrow(() -> new RuntimeException("User not found"));
			ticket.setAssignee(assignee);
		}

		Ticket updated = ticketRepository.save(ticket);
		return convertToDTO(updated);
	}

	// ✅ Delete Ticket
	@Override
	public void deleteTicket(Long id) {
		if (!ticketRepository.existsById(id)) {
			throw new RuntimeException("Ticket not found with ID: " + id);
		}
		ticketRepository.deleteById(id);
	}

	// ✅ Filter Tickets by status, priority, assignee, keyword
	@Override
	public List<TicketDTO> filterTickets(String status, String priority, Long assigneeId, String keyword) {
		List<Ticket> filtered = ticketRepository.filterTickets(status, priority, assigneeId, keyword);
		return filtered.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
}