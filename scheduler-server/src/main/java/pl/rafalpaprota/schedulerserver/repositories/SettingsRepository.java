package pl.rafalpaprota.schedulerserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalpaprota.schedulerserver.model.Settings;

@Repository
public interface SettingsRepository extends CrudRepository<Settings, Long> {
}
