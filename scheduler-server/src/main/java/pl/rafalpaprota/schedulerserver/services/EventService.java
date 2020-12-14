package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.EventDTO;
import pl.rafalpaprota.schedulerserver.model.Block;
import pl.rafalpaprota.schedulerserver.model.Event;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.EventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserService userService;
    private final BlockService blockService;

    @Autowired
    public EventService(EventRepository eventRepository, UserService userService, BlockService blockService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.blockService = blockService;
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
        Event oldEvent = this.eventRepository.findById(id).get();
        if (oldEvent != null) {
            return true;
        } else {
            return false;
        }
    }

    public Long changeEvent(EventDTO eventDTO) {
        Event oldEvent = this.eventRepository.findById(eventDTO.getId()).get();
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


    public List<EventDTO> getCurrentUserEvents() {
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
