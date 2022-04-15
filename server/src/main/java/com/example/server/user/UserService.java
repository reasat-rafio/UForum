package com.example.server.user;

import java.util.List;

public class UserService {
    private final UserRepository studentRepository;

    public UserService(UserRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<User> getAllUsers(){
        return studentRepository.findAll();
    }
    public List<User> saveUsers(User user){
        return studentRepository.saveAll(List.of(user));
    }
}
