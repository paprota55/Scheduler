package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.SettingsRepository;

@Service
public class SettingsService {
    private final SettingsRepository settingsRepository;

    @Autowired
    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public Settings createNewSettings(User user) {
        Settings settings = new Settings();
        settings.setTimeToArchive(14);
        settings.setUser(user);
        return this.settingsRepository.save(settings);
    }
}
