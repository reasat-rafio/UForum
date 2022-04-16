package com.reasatrafio.uforumserver.repository;

import com.reasatrafio.uforumserver.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByEmail(String email);
    List<User> findByUsername(String userName);
}
