package com.reasatrafio.uforumserver.controllers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.reasatrafio.uforumserver.models.Post;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {
    @Autowired
    private MongoTemplate mt;
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


    @GetMapping("post/{postID}")
    public ResponseEntity<?> getOnePostByID(@PathVariable String postID) {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();

        Optional<Post> pst = postRepo.findById(postID);

        if(pst.isPresent()){
            successResponseInJson.put("post", pst.get());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

            try {
                return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

        return new ResponseEntity<String>("posts", HttpStatus.OK);
    }

        @GetMapping("posts/{userId}")
    public ResponseEntity<?> getSinglePost(@PathVariable String userId) {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();

        Query query = new Query();
        query.addCriteria(Criteria.where("postedBy").is(userId));
        List<Post> posts =mt.find(query, Post.class);


        successResponseInJson.put("posts", posts);
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        try {
            return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>("posts", HttpStatus.OK);
    }


    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class SubmitReqBody {
        String title ;
        String description ;
        String[] tags;
        String userId ;
    }

    @PostMapping("post/submit")
    public ResponseEntity<?> submit(@RequestBody String data) throws JsonProcessingException {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        SubmitReqBody reqData = mapper.readValue(data.toString(), SubmitReqBody.class);

        Optional<User> postedBy = userRepo.findById(reqData.userId);

        List<User> likedBy = new ArrayList<User>();
        likedBy.add(postedBy.get());

        Post post = new Post(postedBy.get(), reqData.title, reqData.tags, reqData.description, 1,0, new Date(System.currentTimeMillis()),likedBy);
        Post res = postRepo.save(post);

        // UPDATE THE USER
        List<Post> allPostSubmittedByTheUser = postedBy.get().getPosts();
        List<Post> emptyPostList = new ArrayList<>();
        if (allPostSubmittedByTheUser == null) {
            emptyPostList.add(res);
            postedBy.get().setPosts(emptyPostList);
            userRepo.save(postedBy.get());
        } else {
            allPostSubmittedByTheUser.add(res);
            postedBy.get().setPosts(allPostSubmittedByTheUser);
            userRepo.save(postedBy.get());
        }

        successResponseInJson.put("user", postedBy.get());
        successResponseInJson.put("post", post);

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        try {
            return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        responseInJSON.put("message", "User Doesn't Exist");
        return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/post/delete/{id}")
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

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class EditReqBody {
        String title ;
        String description ;
        String[] tags;
    }

    @PostMapping("/post/edit/{id}")
    public ResponseEntity<?> edit(@PathVariable("id") String id, @RequestBody String data) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        EditReqBody reqData = mapper.readValue(data.toString(), EditReqBody.class);

        System.out.println(reqData.toString());

        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);

        if(findPostById.isPresent()){
            findPostById.get().setTitle(reqData.getTitle());
            findPostById.get().setDescription(reqData.getDescription());
            findPostById.get().setTags(reqData.getTags());
        } else {
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }
        postRepo.save(findPostById.get());
        return new ResponseEntity<Post>(findPostById.get(), HttpStatus.OK);
    }


    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class UpvoteReqBody {
        String userId ;
        boolean userUpvoted;
    }

   @PostMapping("/post/upvote/{id}")
   public ResponseEntity<?> upvote(@RequestBody String data, @PathVariable("id") String id) throws IOException {

       ObjectMapper mapper = new ObjectMapper();
       mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
       UpvoteReqBody reqData = mapper.readValue(data.toString(), UpvoteReqBody.class);

        String userId =  reqData.getUserId();
        boolean userUpvoted = reqData.isUserUpvoted();

        Map<String, Object> successResponseInJson = new LinkedHashMap<>();
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);
        Optional<User> findUserById = userRepo.findById(userId);
        User user = findUserById.get();

       if (findPostById.isEmpty()) {
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }

        /* CHECK IF THE USER EVER LIKED ANY POST
            @REASON: if the user never liked anything then user.getLikedPost().size() will return null
        */
        List<Post> userLikedPostList = new ArrayList<>();
        if (user.getLikedPost() != null && user.getLikedPost().size() > 0) {
            userLikedPostList = user.getLikedPost();
        } else {
            userLikedPostList.add(findPostById.get());
        }

        // GET ALL THE LIKED POST BY USER
        List<Post> getAllLikedPostByUser = userLikedPostList;

        // UPDATE THE POST AND THE USER
        if (!userUpvoted) {
            findPostById.get().getLikedBy().add(user);
            findPostById.get().setUpvote((findPostById.get().getUpvote().intValue() + 1));
            // IF THE USER NEVER LIKED ANY POST
            getAllLikedPostByUser.add(findPostById.get());
        } else {
            findPostById.get().getLikedBy().removeIf((value) -> Objects.equals(value.getId(), user.getId()));
            findPostById.get().setUpvote((findPostById.get().getUpvote().intValue() - 1));
            getAllLikedPostByUser.removeIf((post) -> Objects.equals(post.getId(), findPostById.get().getId()));
        }
       user.setLikedPost(getAllLikedPostByUser);
       userRepo.save(user);
       postRepo.save(findPostById.get());

        successResponseInJson.put("user", user);
        successResponseInJson.put("post", findPostById.get());

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        try {
            return new ResponseEntity<String>(ow.writeValueAsString(successResponseInJson), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        responseInJSON.put("message", "ERROR OF THE POST UPVOTE CONTROLLER");
        return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
    }
}
