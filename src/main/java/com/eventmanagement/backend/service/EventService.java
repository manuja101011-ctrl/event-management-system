package com.eventmanagement.backend.service;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.exception.ResourceNotFoundException;
import com.eventmanagement.backend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event updateEvent(Long id, Event eventDetails) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with id: " + id
                        )
                );

        event.setEventName(eventDetails.getEventName());
        event.setDescription(eventDetails.getDescription());
        event.setCategory(eventDetails.getCategory());
        event.setEventDate(eventDetails.getEventDate());
        event.setEventTime(eventDetails.getEventTime());
        event.setVenue(eventDetails.getVenue());
        event.setCapacity(eventDetails.getCapacity());
        event.setTicketPrice(eventDetails.getTicketPrice());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Event not found with id: " + id
            );
        }

        eventRepository.deleteById(id);
    }
}