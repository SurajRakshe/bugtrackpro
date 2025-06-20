package com.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CommentDTO {

	 private Long id;
	    private String content;
	    private Long ticketId;
	    private String authorName;
	    private LocalDateTime timestamp;
	    private Long parentCommentId;
}
