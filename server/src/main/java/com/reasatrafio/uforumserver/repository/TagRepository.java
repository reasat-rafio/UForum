package com.reasatrafio.uforumserver.repository;

import com.reasatrafio.uforumserver.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {

}
