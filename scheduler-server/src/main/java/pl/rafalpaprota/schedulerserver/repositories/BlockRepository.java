package pl.rafalpaprota.schedulerserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalpaprota.schedulerserver.model.Block;

@Repository
public interface BlockRepository extends CrudRepository<Block, Long> {
}
