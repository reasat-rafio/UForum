package com.reasatrafio.uforumserver.controller;

import com.reasatrafio.uforumserver.model.Post;
import com.reasatrafio.uforumserver.model.User;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/posts")
    public ResponseEntity<?> getAllPost(){
        List<Post> posts = postRepo.findAll();
        if(posts.size() > 0){
            return  new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
        } else {
            return  new ResponseEntity<>("No Post Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getSinglePost(@PathVariable String id){
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

        if(findPostById.isEmpty()){
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(findPostById.get(), HttpStatus.OK);
    }

    @PostMapping("post/submit")
    public ResponseEntity<?> submit(@RequestBody Post post){
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<User> userExist = userRepo.findById(post.getPostedById().getId());
        if(userExist.isPresent()){
            // SAVE THE POST8u
            post.setUpvote(1);
            post.setDownVote(0);
            post.setRemoved(false);
            post.setCreatedAt(new Date(System.currentTimeMillis()));
            postRepo.save(post);

            // UPDATE THE USER
            List<Post> allPost = userExist.get().getPosts();
            allPost.add(post);
            userExist.get().setPosts(allPost);
            userRepo.save(userExist.get());
            return new ResponseEntity<Post>(post, HttpStatus.OK);
        }
        responseInJSON.put("message", "User Doesn't Exist");
        return  new ResponseEntity< HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/post/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id){
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

        if(findPostById.isEmpty()){
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }

        Post postToDelete = findPostById.get();
        postToDelete.setRemoved(true);
        postRepo.save(postToDelete);
        return new ResponseEntity<Post>(postToDelete, HttpStatus.OK);
    }
}
