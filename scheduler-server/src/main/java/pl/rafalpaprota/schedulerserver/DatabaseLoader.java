package pl.rafalpaprota.schedulerserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.rafalpaprota.schedulerserver.dto.BlockDTO;
import pl.rafalpaprota.schedulerserver.model.Event;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.EventRepository;
import pl.rafalpaprota.schedulerserver.repositories.UserRepository;
import pl.rafalpaprota.schedulerserver.services.*;

import java.time.LocalDateTime;


@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final SettingsService settingsService;
    private final BlockService blockService;
    private final EventService eventService;
    private final EventRepository eventRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Value("${spring.datasource.username}")
    private String dataBase;

    @Autowired
    public DatabaseLoader(UserService userService, UserRepository userRepository, RoleService roleService, SettingsService settingsService, BlockService blockService, EventService eventService, EventRepository eventRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.settingsService = settingsService;
        this.blockService = blockService;
        this.eventService = eventService;

        this.eventRepository = eventRepository;
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
            this.settingsService.createNewSettings(user);
            this.blockService.addBlockToDB(new BlockDTO("blok1", LocalDateTime.now().withHour(0), LocalDateTime.now().plusDays(10).withHour(0)), user);
            this.userService.addUser(user);
            this.blockService.addBlockToDB(new BlockDTO("blok2", LocalDateTime.now().plusDays(10).withHour(0), LocalDateTime.now().plusDays(20).withHour(0)), user);
            Event event = new Event();
            event.setUser(user);
            event.setExDate(null);
            event.setRRule(null);
            event.setStatusId(1);
            event.setTypeId(1);
            event.setAllDay(false);
            event.setNotes("Witam");
            event.setTitle("Pierwszy event");
            event.setStartDate(LocalDateTime.now().withHour(10));
            event.setEndDate(LocalDateTime.now().withHour(11));
            this.eventRepository.save(event);
        }
    }
}
