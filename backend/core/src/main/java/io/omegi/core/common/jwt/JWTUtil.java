package io.omegi.core.common.jwt;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTUtil {
    private static final String SECRET_KEY = "z0kX7DbwoLyvmUM1evYnXB6kZhBQfT02ASD25fR2512SElei";

    public String createJwtForService(Integer projectId, Integer serviceId) {
        byte[] secretKeyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        byte[] decoded = Base64.getDecoder().decode(secretKeyBytes);
        SecretKey key = Keys.hmacShaKeyFor(decoded);

        Date now = new Date();

        return Jwts.builder()
                .claim("projectId", projectId)
                .claim("serviceId", serviceId)
                .setIssuedAt(now)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}