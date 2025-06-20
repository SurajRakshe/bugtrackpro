package com.security;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtil {

	 @Value("${app.jwt.secret}")
	    private String secretKeyBase64;

	    private SecretKey getSigningKey() {
	        byte[] keyBytes = Base64.getDecoder().decode(secretKeyBase64);
	        return Keys.hmacShaKeyFor(keyBytes);
	    }

	    public String extractUsername(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }

	    public String extractRole(String token) {
	        return extractAllClaims(token).get("role", String.class);
	    }

	    public Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);
	    }

	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        final Claims claims = extractAllClaims(token);
	        return claimsResolver.apply(claims);
	    }

	    private Claims extractAllClaims(String token) {
	        try {
	            return Jwts
	                    .parserBuilder()
	                    .setSigningKey(getSigningKey())
	                    .build()
	                    .parseClaimsJws(token)
	                    .getBody();
	        } catch (ExpiredJwtException e) {
	            throw new RuntimeException("JWT Token has expired");
	        } catch (MalformedJwtException e) {
	            throw new RuntimeException("Invalid JWT token");
	        } catch (SignatureException e) {
	            throw new RuntimeException("Invalid JWT signature");
	        } catch (Exception e) {
	            throw new RuntimeException("Unable to parse JWT token");
	        }
	    }

	    private Boolean isTokenExpired(String token) {
	        try {
	            return extractExpiration(token).before(new Date());
	        } catch (Exception e) {
	            return true; // Treat error as expired for safety
	        }
	    }

	    public String generateToken(User user) {
	        Map<String, Object> claims = new HashMap<>();
	        claims.put("role", user.getRole());
	        return createToken(claims, user.getEmail());
	    }

	    private String createToken(Map<String, Object> claims, String subject) {
	        return Jwts.builder()
	                .setClaims(claims)
	                .setSubject(subject)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
	                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
	                .compact();
	    }

	    public Boolean validateToken(String token, User user) {
	        try {
	            final String username = extractUsername(token);
	            return (username.equals(user.getEmail()) && !isTokenExpired(token));
	        } catch (Exception e) {
	            return false; // Any failure = token invalid
	        }
	    }
	}