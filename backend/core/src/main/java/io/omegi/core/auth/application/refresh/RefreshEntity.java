package io.omegi.core.auth.application.refresh;



import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Builder
@RedisHash("token")
public class RefreshEntity {

    @Id
    private String username;

    private String refresh;

    @TimeToLive
    private long expiration;
}

