package com.reasatrafio.uforumserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reasatrafio.uforumserver.exceptions.UserCollectionException;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.repository.UserRepository;
import com.reasatrafio.uforumserver.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserRepository userRepo;
    BCryptPasswordEncoder b = new BCryptPasswordEncoder();
    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, users.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findUserById(@PathVariable String id){
        try {
            return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
        } catch (UserCollectionException e) {
             return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody User user){
        try {
            return new ResponseEntity<>(userService.login(user), HttpStatus.OK);
        } catch (UserCollectionException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody User user){
        try {
            return new ResponseEntity<>(userService.register(user), HttpStatus.OK)
        } catch (UserCollectionException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
