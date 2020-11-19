package pl.rafalpaprota.schedulerserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.rafalpaprota.schedulerserver.dto.LogRegUserDTO;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.services.SettingsService;
import pl.rafalpaprota.schedulerserver.services.UserService;
import pl.rafalpaprota.schedulerserver.util.JwtUtil;

@RestController
@CrossOrigin
@RequestMapping
public class UserController {

    private final UserService userService;

    private final SettingsService settingsService;

    private final JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, SettingsService settingsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.settingsService = settingsService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @RequestMapping(method = RequestMethod.GET, value = "api/myAccount")
    public ResponseEntity<?> getMyAccount() {
        User user = this.userService.getUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        LogRegUserDTO userDTO = new LogRegUserDTO();
        userDTO.setLogin(user.getLogin());
        userDTO.setEmail(user.getEmail());
        return ResponseEntity.ok(userDTO);
    }
}
