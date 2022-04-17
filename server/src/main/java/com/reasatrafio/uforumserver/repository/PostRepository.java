package com.reasatrafio.uforumserver.repository;

import com.reasatrafio.uforumserver.model.Post;
import com.reasatrafio.uforumserver.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
}
