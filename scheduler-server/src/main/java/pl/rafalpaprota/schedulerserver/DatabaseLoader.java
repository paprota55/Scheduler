package pl.rafalpaprota.schedulerserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.rafalpaprota.schedulerserver.dto.BlockDTO;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.UserRepository;
import pl.rafalpaprota.schedulerserver.services.BlockService;
import pl.rafalpaprota.schedulerserver.services.RoleService;
import pl.rafalpaprota.schedulerserver.services.SettingsService;
import pl.rafalpaprota.schedulerserver.services.UserService;

import java.time.LocalDateTime;


@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final SettingsService settingsService;
    private final BlockService blockService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Value("${spring.datasource.username}")
    private String dataBase;

    @Autowired
    public DatabaseLoader(UserService userService, UserRepository userRepository, RoleService roleService, SettingsService settingsService, BlockService blockService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.settingsService = settingsService;
        this.blockService = blockService;
    }

    @Override
    public void run(final String... strings) throws Exception {

        if (this.dataBase.equals("postgres")) {
            this.roleService.addRole("USER");
            this.roleService.addRole("ADMIN");

            User user = new User();
            user.setEmail("admin@o2.pl");
            user.setLogin("admin");
            user.setPassword(this.passwordEncoder.encode("admin123"));
            user.setRole(this.roleService.getRoleByName("ADMIN"));

            Long id = this.userService.addUser(user);
            user = this.userRepository.findById(id).get();

            Settings settings = this.settingsService.createNewSettings(user);
            this.blockService.addBlockToDB(new BlockDTO("blok1", LocalDateTime.now(), LocalDateTime.now().plusDays(10)), user);
            this.userService.addUser(user);
        }
    }
}
