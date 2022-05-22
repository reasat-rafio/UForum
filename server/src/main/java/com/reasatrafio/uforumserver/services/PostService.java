package com.reasatrafio.uforumserver.services;

import java.util.List;
import java.util.Optional;

import com.reasatrafio.uforumserver.exceptions.PostCollectionException;
import com.reasatrafio.uforumserver.models.Post;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private MongoTemplate mt;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public Post getPostByID(String postID) throws PostCollectionException {
        Optional<Post> post = postRepo.findById(postID);
        if (post.isEmpty()) {
            throw new PostCollectionException(PostCollectionException.NotFoundException(postID));
        }
        return post.get();
    }

    public List<Post> getAllPostFromUser(String userId) throws PostCollectionException {
        Query query = new Query();
        query.addCriteria(Criteria.where("postedBy").is(userId));
        List<Post> posts = mt.find(query, Post.class);

        if (posts.size() < 1) {
            throw new PostCollectionException(PostCollectionException.NotFoundException(userId));
        }
        return posts;
    }
    


}
