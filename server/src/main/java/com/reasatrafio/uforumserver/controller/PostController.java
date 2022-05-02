package com.reasatrafio.uforumserver.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.reasatrafio.uforumserver.model.Post;
import com.reasatrafio.uforumserver.model.User;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/posts")
    public ResponseEntity<?> getAllPost() {
        List<Post> posts = postRepo.findAll();
        if (posts.size() > 0) {
            return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Post Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getSinglePost(@PathVariable String id) {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

        if (findPostById.isEmpty()) {
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(findPostById.get(), HttpStatus.OK);
    }

    @PostMapping("post/submit")
    public ResponseEntity<?> submit(@RequestBody Post post) {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();
        Optional<User> userExist = userRepo.findById(post.getPostedById().getId());
        if (userExist.isPresent()) {

            List<User> postLikedBy = new ArrayList<User>();
            postLikedBy.add(userExist.get());

            // SAVE THE POST
            post.setUpvote(1);
            post.setDownVote(0);
            post.setRemoved(false);
            post.setLikedBy(postLikedBy);
            post.setCreatedAt(new Date(System.currentTimeMillis()));
            postRepo.save(post);

            // UPDATE THE USER
            List<Post> allPostSubmittedByTheUser = userExist.get().getPosts();
            List<Post> emptyPostList = new ArrayList<>();
            if (allPostSubmittedByTheUser == null) {
                emptyPostList.add(post);
                userExist.get().setPosts(emptyPostList);
                userRepo.save(userExist.get());
            } else {
                allPostSubmittedByTheUser.add(post);
                userExist.get().setPosts(allPostSubmittedByTheUser);
                userRepo.save(userExist.get());
            }
            successResponseInJson.put("user", userExist.get());
            successResponseInJson.put("post", post);

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

            try {
                return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        responseInJSON.put("message", "User Doesn't Exist");
        return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/post/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

        if (findPostById.isEmpty()) {
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }

        Post postToDelete = findPostById.get();
        postToDelete.setRemoved(true);
        postRepo.save(postToDelete);
        return new ResponseEntity<Post>(postToDelete, HttpStatus.OK);
    }

    @PutMapping("/post/upvote/{id}")
    public ResponseEntity<?> upvote(@PathVariable("id") String id, @RequestBody User user) {
        boolean userAlreadyUpvoted = false;
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();
    HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

            if (findPostById.isEmpty()) {
                responseInJSON.put("message", "Post not found");
                return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
            }

            // CHECK IF THE USER ALREADY UPVOTED THIS POST
            for (int i = 0; i < user.getLikedPost().size(); i++ ){
                if (user.getLikedPost().get(i).getId() == findPostById.get().getId()) {
                    userAlreadyUpvoted = true;
                    break;
                } else{
                    userAlreadyUpvoted = false;
                }
            }

            // GET ALL THE LIKED POST BY USER
            List<Post> getallLikedPostByUser = user.getLikedPost();
            List<Post> likedPostByUser = new ArrayList<>();

            // UPDATE THE POST AND THE USER
            if (!userAlreadyUpvoted) {
                findPostById.get().getLikedBy().add(user);
                user.getLikedPost();
                // user.setLikedPost(findPostById.get());
                findPostById.get().setUpvote((findPostById.get().getUpvote().intValue() + 1));

                // IF THE USER NEVER LIKED ANY POST
                if(getallLikedPostByUser == null){
                    likedPostByUser.add(findPostById.get());
                    user.setLikedPost(likedPostByUser);
                    userRepo.save(user);
                } else {
                    getallLikedPostByUser.add(findPostById.get());
                    user.setLikedPost(likedPostByUser);
                    userRepo.save(user);
                }
                postRepo.save(findPostById.get());
            } else {
                findPostById.get().getLikedBy().removeIf((value) -> value.getId() == user.getId());
                findPostById.get().setUpvote((findPostById.get().getUpvote().intValue() - 1));
                getallLikedPostByUser.removeIf((post) -> post.getId() == findPostById.get().getId());
                user.setLikedPost(likedPostByUser);
                userRepo.save(user);
                postRepo.save(findPostById.get());
            }

            successResponseInJson.put("user", user);
            successResponseInJson.put("post", findPostById.get());

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

            try {
                return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
    responseInJSON.put("message", "ERROR OF THE POSTUPVOTE CONTROLLER");
    return  new ResponseEntity< HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
    }
}
