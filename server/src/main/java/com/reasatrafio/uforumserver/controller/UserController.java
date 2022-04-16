package com.reasatrafio.uforumserver.controller;

import com.reasatrafio.uforumserver.model.User;
import com.reasatrafio.uforumserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;



@RestController
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userRepo.findAll();
        if(users.size() > 0){
            return  new ResponseEntity<List<User>>(users, HttpStatus.OK);
        } else {
            return  new ResponseEntity<>("No User Found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> createTodo(@RequestBody User user){
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
            userRepo.save(user);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/users/{id}")
//    public ResponseEntity<?> getSingleUser(@PathVariable("id") String id){
//
//    }
}
