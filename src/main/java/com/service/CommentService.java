package com.service;

import java.util.List;

import com.dto.CommentDTO;

public interface CommentService {

    CommentDTO addComment(CommentDTO dto);
    List<CommentDTO> getCommentsByTicketId(Long ticketId);
}
