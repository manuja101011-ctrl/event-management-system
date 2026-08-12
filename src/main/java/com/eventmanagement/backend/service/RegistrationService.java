package com.eventmanagement.backend.service;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.exception.DuplicateRegistrationException;
import com.eventmanagement.backend.exception.ResourceNotFoundException;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;
import com.eventmanagement.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Registration createRegistration(Long userId, Long eventId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        )
                );

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with id: " + eventId
                        )
                );

        if (registrationRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new DuplicateRegistrationException(
                    "User is already registered for this event"
            );
        }

        Registration registration = new Registration();

        registration.setUser(user);
        registration.setEvent(event);
        registration.setRegistrationDate(LocalDateTime.now());
        registration.setStatus("REGISTERED");

        return registrationRepository.save(registration);
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public List<Registration> getRegistrationsByUser(Long userId) {

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException(
                    "User not found with id: " + userId
            );
        }

        return registrationRepository.findByUserId(userId);
    }

    public List<Registration> getRegistrationsByEvent(Long eventId) {

        if (!eventRepository.existsById(eventId)) {
            throw new ResourceNotFoundException(
                    "Event not found with id: " + eventId
            );
        }

        return registrationRepository.findByEventId(eventId);
    }

    public void cancelRegistration(Long id) {

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Registration not found with id: " + id
                        )
                );

        registration.setStatus("CANCELLED");

        registrationRepository.save(registration);
    }
}