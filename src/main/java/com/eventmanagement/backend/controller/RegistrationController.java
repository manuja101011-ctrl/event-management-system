package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/user/{userId}/event/{eventId}")
    public ResponseEntity<Registration> createRegistration(
            @PathVariable Long userId,
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                registrationService.createRegistration(userId, eventId)
        );
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        return ResponseEntity.ok(
                registrationService.getAllRegistrations()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Registration>> getRegistrationsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                registrationService.getRegistrationsByUser(userId)
        );
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Registration>> getRegistrationsByEvent(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                registrationService.getRegistrationsByEvent(eventId)
        );
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelRegistration(
            @PathVariable Long id) {

        registrationService.cancelRegistration(id);

        return ResponseEntity.ok(
                "Registration cancelled successfully"
        );
    }
}