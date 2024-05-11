package io.omegi.core.user.presentat.model.response;

import lombok.Builder;
import java.util.List;

public record DrawUserProfileResponse (
        List<UserResponse> user
)
{
    @Builder
    public record UserResponse(
            Integer userId,
            String username,
            String profileImageUrl

    ) {
    }
}
