package pl.rafalpaprota.schedulerserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rafalpaprota.schedulerserver.dto.SettingsDTO;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.services.SettingsService;

@RestController
@CrossOrigin
@RequestMapping
public class SettingsController {

    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "api/settings/getSettings")
    public ResponseEntity<?> getMySettings() {
        SettingsDTO settingsDTO = this.settingsService.getSettings();
        if (settingsDTO != null) {
            return ResponseEntity.ok(settingsDTO);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nie posiadasz ustawień");
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "api/settings/changeSettings")
    public ResponseEntity<?> changeSettings(@RequestBody SettingsDTO settingsDTO) {
        Settings settings = this.settingsService.getCurrentUserSettings();
        if (settings != null) {
            if (settingsDTO != null) {
                this.settingsService.changeSettings(settingsDTO, settings);

                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nie podałeś ustawień.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nie możemy znaleźć twoich ustawień.");
        }
    }
}
