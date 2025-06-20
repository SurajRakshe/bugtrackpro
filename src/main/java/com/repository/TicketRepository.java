package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
	 // ✅ Existing method to get tickets by project
    List<Ticket> findByProjectId(Long projectId);

    // ✅ New method to support dynamic filtering
    @Query("SELECT t FROM Ticket t " +
           "WHERE (:status IS NULL OR t.status = :status) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:assigneeId IS NULL OR t.assignee.id = :assigneeId) " +
           "AND (:keyword IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Ticket> filterTickets(
        @Param("status") String status,
        @Param("priority") String priority,
        @Param("assigneeId") Long assigneeId,
        @Param("keyword") String keyword
    );
}
