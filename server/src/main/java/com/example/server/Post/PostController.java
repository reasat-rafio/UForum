package com.example.server.Post;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> fetchAllUser(){
        return postService.getAllPosts();
    }

    @PostMapping("save")
    public List<Post>savePost(@RequestBody Post post){
    return postService.getAllPosts();
    }
}


