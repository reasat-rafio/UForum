package com.reasatrafio.uforumserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.repository.UserRepository;

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

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userRepo.findAll();
        if(users.size() > 0){
            return new ResponseEntity<List<User>>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getSingleUser(@PathVariable String id){
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<User> findUserById = userRepo.findById(id);

        if(findUserById.isEmpty()){
            responseInJSON.put("message", "User not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(findUserById.get(), HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> getUser(@RequestBody User user){
        HashMap<String, String> responseInJSON = new HashMap<>();
        try {
            List<User> findUserByEmail =  userRepo.findByEmail(user.getEmail());
            boolean passwordMatched = b.matches(user.getPassword(), findUserByEmail.get(0).getPassword());
            if(!passwordMatched){
                responseInJSON.put("message", "Password is incorrect");
                return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_ACCEPTABLE);
            }

            ObjectMapper mapper = new ObjectMapper();
            String serialized = mapper.writeValueAsString(findUserByEmail.get(0));
            System.out.println("serialized" + serialized);
            return new ResponseEntity<String>(serialized, HttpStatus.OK);

        }catch (IndexOutOfBoundsException e){
            responseInJSON.put("message", "Email is not registered");
            return  new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_ACCEPTABLE);
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> createUser(@RequestBody User user){
        try{
            List<User> checkUserByEmail  = userRepo.findByEmail(user.getEmail());
            List<User> checkUserByUsername = userRepo.findByUsername(user.getUsername());
            HashMap<String, String> responseInJSON = new HashMap<>();

            if(checkUserByEmail.size() > 0 ) {
                responseInJSON.put("message", "Email Already Registered");
                return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if(checkUserByUsername.size() > 0) {
                responseInJSON.put("message", "Username Already Taken");
                return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String hashPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            user.setPassword(hashPassword);
            user.setCreatedAt(new Date(System.currentTimeMillis()));
            user.setVerified(false);
            userRepo.save(user);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody User user){
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<User> findUserById = userRepo.findById(id);

        if(findUserById.isEmpty()){
            responseInJSON.put("message", "Username not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }

        User userToSave = findUserById.get();
        userToSave.setUsername(user.getUsername() != null ? user.getUsername() : userToSave.getUsername());
        userRepo.save(userToSave);
        return new ResponseEntity<User>(userToSave, HttpStatus.OK);
    }
}
