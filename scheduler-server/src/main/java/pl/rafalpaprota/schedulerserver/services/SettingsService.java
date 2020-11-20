package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.SettingsRepository;

@Service
public class SettingsService {
    private final SettingsRepository settingsRepository;
    private final UserService userService;

    @Autowired
    public SettingsService(SettingsRepository settingsRepository, UserService userService) {
        this.settingsRepository = settingsRepository;
        this.userService = userService;
    }

    public Settings createNewSettings(User user) {
        Settings settings = new Settings();
        settings.setTimeToArchive(14);
        settings.setUser(user);
        return this.settingsRepository.save(settings);
    }

    public Long changeArchiveTime(Integer days){
        User user = userService.getCurrentUser();
        Settings settings = settingsRepository.findByUser(user);
        settings.setTimeToArchive(days);
        return settingsRepository.save(settings).getId();
    }
}
