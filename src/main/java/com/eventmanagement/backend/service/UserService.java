package com.eventmanagement.backend.service;

import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.exception.ResourceNotFoundException;
import com.eventmanagement.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER USER
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // LOGIN USER
    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid email or password"
                        )
                );

        if (!user.getPassword().equals(password)) {
            throw new ResourceNotFoundException(
                    "Invalid email or password"
            );
        }

        return user;
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // UPDATE USER
    public User updateUser(Long id, User userDetails) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id
                        )
                );

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());

        return userRepository.save(user);
    }

    // DELETE USER
    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "User not found with id: " + id
            );
        }

        userRepository.deleteById(id);
    }
}