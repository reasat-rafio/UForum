package com.reasatrafio.uforumserver.controllers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reasatrafio.uforumserver.models.Comment;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.models.Post;
import com.reasatrafio.uforumserver.repository.PostRepository;
import com.reasatrafio.uforumserver.repository.UserRepository;
import com.reasatrafio.uforumserver.repository.CommentRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentController {
    @Autowired
    private MongoTemplate mt;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private CommentRepository CommentRepo;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    static class CreateReqBody {
        String comment;
        String postID;
        String userID;

    }
    @PostMapping("comment/create")
    public ResponseEntity<?> create(@RequestBody String data) throws JsonProcessingException {
        HashMap<String, String> responseInJSON = new HashMap<>();
        Map<String, Object> successResponseInJson = new LinkedHashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        CommentController.CreateReqBody reqData = mapper.readValue(data.toString(), CommentController.CreateReqBody.class);

        Optional<User> findUserById = userRepo.findById(reqData.getUserID());
        Optional<Post> findPostById = postRepo.findById(reqData.getPostID());

        Comment _comment = new Comment();

        if(findPostById.isPresent() && findUserById.isPresent()){
            _comment.setUser(findUserById.get());
            _comment.setUser(findUserById.get());
            _comment.setComment(reqData.comment);
            _comment.setCreatedAt(new Date(System.currentTimeMillis()));
            _comment.setUpvote(1);
            _comment.setDownVote(0);
            Comment finalCmt = CommentRepo.save(_comment);

            List<Comment> allCommentOfThePost = findPostById.get().getComments();
            if(allCommentOfThePost ==null){
                allCommentOfThePost = new ArrayList<>();
            }

            allCommentOfThePost.add(finalCmt);

            findPostById.get().setComments(allCommentOfThePost);
            findUserById.get().setComments(allCommentOfThePost);

            userRepo.save(findUserById.get());
            Post _post =  postRepo.save(findPostById.get());

            return new ResponseEntity<Post>(_post, HttpStatus.OK);
        }

        return new ResponseEntity<String>("ERR", HttpStatus.OK);
        }
    }
