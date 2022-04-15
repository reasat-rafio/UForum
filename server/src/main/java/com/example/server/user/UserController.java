package com.example.server.user;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/student")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> fetchAllUser(){
        return userService.getAllUsers();
    }

    @PostMapping("save")
    public List<User>saveUser(@RequestBody User user){
        return userService.saveUsers(user);
    }
}


