package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.EventDTO;
import pl.rafalpaprota.schedulerserver.model.Block;
import pl.rafalpaprota.schedulerserver.model.Event;
import pl.rafalpaprota.schedulerserver.model.Settings;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.EventRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserService userService;
    private final BlockService blockService;
    private final SettingsService settingsService;
    private final ExpiredEventsService expiredEventsService;

    @Autowired
    public EventService(EventRepository eventRepository, UserService userService, BlockService blockService, SettingsService settingsService, ExpiredEventsService expiredEventsService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.blockService = blockService;
        this.settingsService = settingsService;
        this.expiredEventsService = expiredEventsService;
    }

    public Long addNewEvent(EventDTO eventDTO) {
        Event newEvent = new Event();
        newEvent.setId(eventDTO.getId());
        newEvent.setAllDay(eventDTO.getAllDay());
        newEvent.setEndDate(eventDTO.getEndDate().plusHours(1));
        newEvent.setStartDate(eventDTO.getStartDate().plusHours(1));
        newEvent.setTitle(eventDTO.getTitle());
        newEvent.setNotes(eventDTO.getNotes());
        newEvent.setTypeId(eventDTO.getTypeId());
        newEvent.setStatusId(eventDTO.getStatusId());
        newEvent.setRRule(eventDTO.getRRule());
        newEvent.setExDate(eventDTO.getExDate());
        newEvent.setUser(this.userService.getCurrentUser());
        System.out.println(newEvent);
        System.out.println(eventDTO);
        return this.eventRepository.save(newEvent).getId();
    }

    public boolean checkIfExist(Long id) {
        Optional<Event> oldEvent = this.eventRepository.findById(id);
        if (oldEvent != null) {
            return true;
        } else {
            return false;
        }
    }

    public void moveEventsToExpiredEventsWhenReachArchiveTime() {
        List<Event> eventList = this.eventRepository.findAllByUser(this.userService.getCurrentUser());
        Settings settings = this.settingsService.getCurrentUserSettings();
        for (Event event : eventList) {
            if (event.getEndDate().isBefore(LocalDateTime.now().minusDays(settings.getTimeToArchive()))) {
                this.expiredEventsService.addExpiredEvent(event);
                this.eventRepository.delete(event);
            }
        }
    }

    public Long changeEvent(EventDTO eventDTO) {
        Event oldEvent = this.eventRepository.findById(eventDTO.getId()).get();
        System.out.println(oldEvent);
        System.out.println(eventDTO);
        boolean edited = false;
        boolean moved = false;
        if (!oldEvent.getStartDate().isEqual(eventDTO.getStartDate().plusHours(1)) || !oldEvent.getEndDate().isEqual(eventDTO.getEndDate().plusHours(1)) || !oldEvent.getAllDay().equals(eventDTO.getAllDay())) {
            moved = true;
            if (oldEvent.getExDate().equals(eventDTO.getExDate())) {
                oldEvent.setEndDate(eventDTO.getEndDate().plusHours(1));
                oldEvent.setStartDate(eventDTO.getStartDate().plusHours(1));
            }
        }
        if (!oldEvent.getNotes().equals(eventDTO.getNotes())
                || !oldEvent.getExDate().equals(eventDTO.getExDate())
                || !oldEvent.getRRule().equals(eventDTO.getRRule())
                || !oldEvent.getTitle().equals(eventDTO.getTitle())
                || !oldEvent.getTypeId().equals(eventDTO.getTypeId())) {
            edited = true;
        }

        if (edited && moved) {
            oldEvent.setStatusId(3);
        } else if (!edited && moved) {
            oldEvent.setStatusId(1);
        } else {
            oldEvent.setStatusId(2);
        }
        oldEvent.setAllDay(eventDTO.getAllDay());
        oldEvent.setTitle(eventDTO.getTitle());
        oldEvent.setNotes(eventDTO.getNotes());
        oldEvent.setTypeId(eventDTO.getTypeId());
        oldEvent.setRRule(eventDTO.getRRule());
        oldEvent.setExDate(eventDTO.getExDate());
        return this.eventRepository.save(oldEvent).getId();

    }


    public List<EventDTO> getCurrentUserEventsDTO() {
        User user = this.userService.getCurrentUser();
        List<Event> eventArrayList = this.eventRepository.findAllByUser(user);
        ArrayList<EventDTO> eventDTOArrayList = new ArrayList<>();
        for (Event current : eventArrayList) {
            eventDTOArrayList.add(new EventDTO(current));
        }
        return eventDTOArrayList;
    }

    public List<EventDTO> getCurrentUserEventsByBlock(String blockName) {
        User user = this.userService.getCurrentUser();
        Block block = this.blockService.getBlockByUserAndBlockName(user, blockName);

        List<Event> eventArrayList = this.eventRepository.findAllByUser(user);
        ArrayList<EventDTO> eventDTOArrayList = new ArrayList<>();
        for (Event current : eventArrayList) {
            if (current.getStartDate().isAfter(block.getDateFrom()) && current.getStartDate().isBefore(block.getDateTo())) {
                eventDTOArrayList.add(new EventDTO(current));
            }
        }
        return eventDTOArrayList;
    }


    public void deleteEvent(Long eventId) {
        this.eventRepository.deleteById(eventId);
    }

    public boolean checkIfEventIsThisUser(Long eventId) {
        return this.eventRepository.findByIdAndUser(eventId, this.userService.getCurrentUser()) != null;
    }


}
