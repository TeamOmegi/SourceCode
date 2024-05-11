package io.omegi.core.auth.application.controller;

import io.omegi.core.auth.application.refresh.RefreshEntity;
import io.omegi.core.auth.application.refresh.RefreshTokenService;
import io.omegi.core.auth.jwt.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;

@Controller
@ResponseBody
public class ReissueController {
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public ReissueController(JwtUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;

        refresh = Arrays.stream(request.getCookies())
                .filter(cookie -> "refresh".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);

        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }
        RefreshEntity storedToken = refreshTokenService.getRefreshToken(jwtUtil.getUsername(refresh));

        System.out.println(
                storedToken
        );
        if (storedToken == null) {
            return new ResponseEntity<>("refresh token not found or expired", HttpStatus.BAD_REQUEST);
        }
        if (System.currentTimeMillis() > storedToken.getExpiration()) {
            return new ResponseEntity<>("refresh token expired", HttpStatus.UNAUTHORIZED);
        }

        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String username = jwtUtil.getUsername(refresh);
        refreshTokenService.deleteRefreshToken(username);
        String newAccess = jwtUtil.createJwt("access", username, 86400L);
        String newRefresh = jwtUtil.createJwt("refresh", username, 259200L);
        refreshTokenService.storeRefreshToken(username, newRefresh, 259200L);
        response.addCookie(createCookie("access",newAccess));
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        if ("access".equals(key)) {
            cookie.setMaxAge(24 * 60 * 60);
        } else if ("refresh".equals(key)) {
            cookie.setMaxAge(72 * 60 * 60);
        }


        return cookie;
    }
}
