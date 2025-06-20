package com.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException; 

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileUploadController {

	  @Value("${upload.dir}")
	    private String uploadDir;

	    @PostMapping("/upload")
	    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
	        try {
	            Files.createDirectories(Paths.get(uploadDir));

	            Path filePath = Paths.get(uploadDir, file.getOriginalFilename());
	            file.transferTo(filePath);

	            Map<String, String> result = new HashMap<>();
	            result.put("filename", file.getOriginalFilename());
	            result.put("url", "/api/files/" + file.getOriginalFilename());

	            return ResponseEntity.ok(result);
	        } catch (IOException e) {
	            e.printStackTrace(); // Optional: log for debugging
	            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
	        }
	    }

	    @GetMapping("/{filename:.+}")
	    public ResponseEntity<?> downloadFile(@PathVariable String filename) {
	        Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
	        if (!Files.exists(filePath)) {
	            return ResponseEntity.notFound().build();
	        }

	        try {
	            byte[] fileBytes = Files.readAllBytes(filePath);
	            return ResponseEntity.ok()
	                    .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
	                    .body(fileBytes);
	        } catch (IOException e) {
	            e.printStackTrace(); // Optional: log for debugging
	            return ResponseEntity.status(500).body("Could not download file: " + e.getMessage());
	        }
	    }
	}