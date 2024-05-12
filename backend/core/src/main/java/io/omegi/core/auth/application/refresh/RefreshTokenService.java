package io.omegi.core.auth.application.refresh;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);

    @Autowired
    private RedisTemplate<String, RefreshEntity> redisTemplate;

    public void storeRefreshToken(String username, String refreshToken, long durationInMillis) {
        long expirationTimestamp = System.currentTimeMillis() + durationInMillis;

        RefreshEntity refreshEntity = RefreshEntity.builder()
                .username(username)
                .refresh(refreshToken)
                .expiration(expirationTimestamp)
                .build();

        redisTemplate.opsForValue().set(username, refreshEntity, durationInMillis, TimeUnit.MILLISECONDS);

        logger.debug("Stored refresh token for user: {}, token: {}, expires at: {}", username, refreshToken, expirationTimestamp);
    }
    public RefreshEntity getRefreshToken(String username) {
        RefreshEntity refreshEntity = redisTemplate.opsForValue().get(username);

        return refreshEntity;
    }

    public void deleteRefreshToken(String username) {

        redisTemplate.delete(username);
    }
}
