package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.LogRegUserDTO;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.RoleRepository;
import pl.rafalpaprota.schedulerserver.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long addUser(final User user) {
        return this.userRepository.save(user).getId();
    }

    public User addUserByUserDTO(final LogRegUserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin());
        user.setPassword(this.passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setRole(this.roleRepository.findByName("USER"));
        return this.userRepository.save(user);
    }

    public void deleteUserByLogin(final String login) {
        this.userRepository.deleteByLogin(login);
    }

    public User getUserByLogin(final String login) {
        return this.userRepository.findByLogin(login);
    }

    public List<User> getAllUsers() {
        return (List<User>) this.userRepository.findAll();
    }
}
