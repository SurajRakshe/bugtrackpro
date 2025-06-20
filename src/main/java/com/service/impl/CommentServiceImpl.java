package com.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dto.CommentDTO;
import com.entity.Comment;
import com.entity.Ticket;
import com.entity.User;
import com.exception.ResourceNotFoundException;
import com.repository.CommentRepository;
import com.repository.TicketRepository;
import com.repository.UserRepository;
import com.service.CommentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class CommentServiceImpl implements CommentService {

	private final CommentRepository commentRepository;
	private final TicketRepository ticketRepository;
	private final UserRepository userRepository;

	@Override
	public CommentDTO addComment(CommentDTO dto) {
		Ticket ticket = ticketRepository.findById(dto.getTicketId())
				.orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));

		User author = userRepository.findByName(dto.getAuthorName())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Comment comment = new Comment();
		comment.setContent(dto.getContent());
		comment.setTicket(ticket);
		comment.setAuthor(author);
		comment.setTimestamp(LocalDateTime.now());

		if (dto.getParentCommentId() != null) {
			Comment parent = commentRepository.findById(dto.getParentCommentId())
					.orElseThrow(() -> new ResourceNotFoundException("Parent comment not found"));
			comment.setParentComment(parent);
		}

		return mapToDTO(commentRepository.save(comment));
	}

	@Override
	public List<CommentDTO> getCommentsByTicketId(Long ticketId) {
		return commentRepository.findByTicketIdOrderByTimestampAsc(ticketId).stream().map(this::mapToDTO)
				.collect(Collectors.toList());
	}

	private CommentDTO mapToDTO(Comment comment) {
		CommentDTO dto = new CommentDTO();
		dto.setId(comment.getId());
		dto.setContent(comment.getContent());
		dto.setTicketId(comment.getTicket().getId());
		dto.setAuthorName(comment.getAuthor().getName());
		dto.setTimestamp(comment.getTimestamp());
		if (comment.getParentComment() != null) {
			dto.setParentCommentId(comment.getParentComment().getId());
		}
		return dto;
	}
}