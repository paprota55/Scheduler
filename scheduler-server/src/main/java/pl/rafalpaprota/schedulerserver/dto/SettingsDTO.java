package pl.rafalpaprota.schedulerserver.dto;

import lombok.Data;
import pl.rafalpaprota.schedulerserver.model.Settings;

@Data
public class SettingsDTO {
    private Integer timeToArchive;

    public SettingsDTO() {
    }

    public SettingsDTO(Settings settings) {
        this.timeToArchive = settings.getTimeToArchive();
    }
}

