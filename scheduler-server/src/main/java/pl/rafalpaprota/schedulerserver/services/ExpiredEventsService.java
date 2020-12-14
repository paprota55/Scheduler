package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.EventDTO;
import pl.rafalpaprota.schedulerserver.model.ExpiredEvent;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.ExpiredEventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpiredEventsService {
    private final ExpiredEventRepository expiredEventRepository;
    private final UserService userService;

    @Autowired
    public ExpiredEventsService(ExpiredEventRepository expiredEventRepository, UserService userService) {

        this.expiredEventRepository = expiredEventRepository;
        this.userService = userService;
    }

    public List<EventDTO> getCurrentUserExpiredEvents() {
        User user = this.userService.getCurrentUser();
        List<ExpiredEvent> eventArrayList = this.expiredEventRepository.findAllByUser(user);
        ArrayList<EventDTO> eventDTOArrayList = new ArrayList<>();
        for (ExpiredEvent current : eventArrayList) {
            eventDTOArrayList.add(new EventDTO(current));
        }
        return eventDTOArrayList;
    }

}
