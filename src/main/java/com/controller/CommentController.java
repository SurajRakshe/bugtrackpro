package com.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.CommentDTO;
import com.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
	
	  private final CommentService commentService;

	    @PostMapping
	    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO dto) {
	        return ResponseEntity.ok(commentService.addComment(dto));
	    }

	    @GetMapping("/ticket/{ticketId}")
	    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long ticketId) {
	        return ResponseEntity.ok(commentService.getCommentsByTicketId(ticketId));
	    }
	}



