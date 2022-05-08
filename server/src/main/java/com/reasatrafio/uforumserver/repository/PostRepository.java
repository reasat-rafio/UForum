package com.reasatrafio.uforumserver.repository;


import com.reasatrafio.uforumserver.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
}
