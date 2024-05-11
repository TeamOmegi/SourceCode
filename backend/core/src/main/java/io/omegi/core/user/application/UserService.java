package io.omegi.core.user.application;

import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import io.omegi.core.user.presentat.model.response.DrawUserProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public DrawUserProfileResponse drawUserProfile(String username){
        User user = userRepository.findByUsername(username);


        DrawUserProfileResponse.UserResponse userResponse = DrawUserProfileResponse.UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .profileImageUrl(user.getProfileImageUrl())
                .build();

        return new DrawUserProfileResponse(Collections.singletonList(userResponse));
    }

}
