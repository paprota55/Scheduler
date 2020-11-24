package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.SettingsDTO;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.SettingsRepository;

@Service
public class SettingsService {
    private final SettingsRepository settingsRepository;
    private final UserService userService;
    private Integer defaultTime = 14;
    private Integer maximumTime = 93;
    private Integer minimumTime = 1;

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

    public SettingsDTO getSettings() {
        User user = this.userService.getCurrentUser();
        return new SettingsDTO(this.settingsRepository.findByUser(user));
    }

    public Settings getCurrentUserSettings() {
        User user = this.userService.getCurrentUser();
        return this.settingsRepository.findByUser(user);
    }

    public Long changeSettings(SettingsDTO settingsDTO, Settings settings) {
        if (settingsDTO.getTimeToArchive() != null) {
            if (settingsDTO.getTimeToArchive() > this.maximumTime) {
                settings.setTimeToArchive(this.maximumTime);
            } else if (settingsDTO.getTimeToArchive() < this.minimumTime) {
                settings.setTimeToArchive(this.minimumTime);
            } else {
                settings.setTimeToArchive(settingsDTO.getTimeToArchive());
            }
        } else {
            settings.setTimeToArchive(this.defaultTime);
        }
        return this.settingsRepository.save(settings).getId();
    }
}
