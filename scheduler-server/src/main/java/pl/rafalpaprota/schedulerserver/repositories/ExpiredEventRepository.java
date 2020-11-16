package pl.rafalpaprota.schedulerserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalpaprota.schedulerserver.model.ExpiredEvent;

@Repository
public interface ExpiredEventRepository extends CrudRepository<ExpiredEvent, Long> {
}
