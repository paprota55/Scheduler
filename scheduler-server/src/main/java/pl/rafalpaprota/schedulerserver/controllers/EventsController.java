package pl.rafalpaprota.schedulerserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rafalpaprota.schedulerserver.dto.EventDTO;
import pl.rafalpaprota.schedulerserver.services.EventService;

@RestController
@CrossOrigin
@RequestMapping
public class EventsController {
    private final EventService eventService;

    @Autowired
    public EventsController(EventService eventService) {
        this.eventService = eventService;
    }


    @RequestMapping(method = RequestMethod.POST, value = "api/events/addEvent")
    public ResponseEntity<?> addEvent(@RequestBody EventDTO eventDTO) {
        return ResponseEntity.ok(this.eventService.addNewEvent(eventDTO));
    }

    @RequestMapping(method = RequestMethod.GET, value = "api/events/getEvents")
    public ResponseEntity<?> getCurrentUserEvents() {
        return ResponseEntity.ok(this.eventService.getCurrentUserEvents());
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "api/events/deleteEvent/{eventId}")
    public ResponseEntity<?> deleteUserBlock(@PathVariable final Long eventId) {
        System.out.println("I'm in");
        if (this.eventService.checkIfEventIsThisUser(eventId)) {
            this.eventService.deleteEvent(eventId);
            return ResponseEntity.ok("Deleted");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("It isn't your event");
        }
    }
}
