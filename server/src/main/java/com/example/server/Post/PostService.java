package com.example.server.Post;

import com.example.server.user.User;

import java.util.List;

public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = (PostRepository) postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
