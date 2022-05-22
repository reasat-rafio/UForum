package com.reasatrafio.uforumserver.controllers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.reasatrafio.uforumserver.exceptions.PostCollectionException;
import com.reasatrafio.uforumserver.models.Post;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import com.reasatrafio.uforumserver.services.PostService;

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
    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<?> getAllPost() {
        List<Post> posts = postService.getAllPosts();
         return new ResponseEntity<>(posts, posts.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("post/{postID}")
    public ResponseEntity<?> getPostByID(@PathVariable String postID) {
        try {
            return new ResponseEntity<>(postService.getPostByID(postID), HttpStatus.OK);
        } catch (PostCollectionException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("posts/{userId}")
    public ResponseEntity<?> getAllPostFromUser(@PathVariable String userId) {
       try {
           return new ResponseEntity<>(postService.getAllPostFromUser(userId), HttpStatus.OK);
       } catch (PostCollectionException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       }
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class SubmitReqBody {
        String title;
        String description;
        String[] tags;
        String userId;
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

        Post post = new Post(postedBy.get(), reqData.title, reqData.tags, reqData.description, 1, 0, new Date(System.currentTimeMillis()), likedBy);
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


    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class BookmarkReqBody {
        String userId;
        boolean userBookmarked;
    }
    @PostMapping("post/bookmark/{postID}")
    public ResponseEntity<?> bookmark(@RequestBody String data,
                                      @PathVariable("postID") String postID) throws JsonProcessingException {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        BookmarkReqBody reqData = mapper.readValue(data.toString(), BookmarkReqBody.class);

        Optional<User> user = userRepo.findById(reqData.getUserId());
        Optional<Post> post = postRepo.findById(postID);

        List<Post> allBookmarks;

        if(user.isEmpty()){
            return new ResponseEntity<String>("USER NOT FOUND", HttpStatus.NOT_FOUND);
        }
        if(post.isEmpty()){
            return new ResponseEntity<String>("POST NOT FOUND", HttpStatus.NOT_FOUND);
        }

        if(!reqData.isUserBookmarked()) {
            if(user.get().getBookmarks() != null){
                allBookmarks = user.get().getBookmarks();
                allBookmarks.add(post.get());
            } else {
                allBookmarks = new ArrayList<>();
                allBookmarks.add(post.get());
            }
        } else {
            allBookmarks = user.get().getBookmarks();
            user.get().getBookmarks().removeIf((value) -> Objects.equals(value.getId(), post.get().getId()));
        }



        user.get().setBookmarks(allBookmarks);
        userRepo.save(user.get());
        return new ResponseEntity<User>(user.get(), HttpStatus.OK);
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
        String title;
        String description;
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

        if (findPostById.isPresent()) {
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
    static class VoteReqBody {
        String userId;
        boolean userUpvoted;
        boolean userDownvoted;
        String voteType;
    }

    @PostMapping("/post/vote/{id}")
    public ResponseEntity<?> vote(@RequestBody String data, @PathVariable("id") String id) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        VoteReqBody reqData = mapper.readValue(data.toString(), VoteReqBody.class);

        String userId = reqData.getUserId();
        boolean userUpvoted = reqData.isUserUpvoted();
        boolean userDownvoted = reqData.isUserDownvoted();

        Map<String, Object> successResponseInJson = new LinkedHashMap<>();
        HashMap<String, String> responseInJSON = new HashMap<>();
        Optional<Post> findPostById = postRepo.findById(id);
        Optional<User> findUserById = userRepo.findById(userId);
        User user = findUserById.get();

        if (findPostById.isEmpty()) {
            responseInJSON.put("message", "Post not found");
            return new ResponseEntity<HashMap<String, String>>(responseInJSON, HttpStatus.NOT_FOUND);
        }

        /* CHECK IF THE USER EVER LIKED OR DISLIKED ANY POST
            @REASON: if the user never liked anything then user.getLikedPost().size() will return null
        */
        List<Post> userLikedPostList = new ArrayList<>();
        List<Post> userDislikedPostList = new ArrayList<>();


        if (user.getLikedPost() != null && user.getLikedPost().size() > 0) {
            userLikedPostList = user.getLikedPost();
        } else {
            if (reqData.getVoteType().equals("UP")) {
                userLikedPostList.add(findPostById.get());
            }
        }

        if (user.getDislikedPost() != null && user.getDislikedPost().size() > 0) {
            userDislikedPostList = user.getDislikedPost();
        } else {
            if (reqData.getVoteType().equals("DOWN")) {
                userDislikedPostList.add(findPostById.get());
            }
        }

        // GET ALL THE LIKED && DISLIKED POST BY USER
        List<Post> getAllLikedPostByUser = userLikedPostList;
        List<Post> getAllDislikedPostByUser = userDislikedPostList;

        // UPDATE THE POST AND THE USER
        if (reqData.getVoteType().equals("UP")) {
            getAllDislikedPostByUser.removeIf((post) -> Objects.equals(post.getId(), findPostById.get().getId()));
            if (findPostById.get().getDislikedBy() != null)
                findPostById.get().getDislikedBy().removeIf((value) -> Objects.equals(value.getId(), user.getId()));

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
        }

        if (reqData.getVoteType().equals("DOWN")) {
            getAllLikedPostByUser.removeIf((post) -> Objects.equals(post.getId(), findPostById.get().getId()));
            if (findPostById.get().getLikedBy() != null)
                findPostById.get().getLikedBy().removeIf((value) -> Objects.equals(value.getId(), user.getId()));
            if (!userDownvoted) {
                List<User> usr = new ArrayList<>();
                usr.add(user);
                findPostById.get().setDislikedBy(usr);
                findPostById.get().setDownVote((findPostById.get().getDownVote().intValue() + 1));
                // IF THE USER NEVER LIKED ANY POST
                getAllDislikedPostByUser.add(findPostById.get());
            } else {
                findPostById.get().getDislikedBy().removeIf((value) -> Objects.equals(value.getId(), user.getId()));
                findPostById.get().setDownVote((findPostById.get().getUpvote().intValue() - 1));
                getAllDislikedPostByUser.removeIf((post) -> Objects.equals(post.getId(), findPostById.get().getId()));
            }
        }

        user.setLikedPost(getAllLikedPostByUser);
        user.setDislikedPost(getAllDislikedPostByUser);
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
