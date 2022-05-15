package com.reasatrafio.uforumserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Comment {
    @Id
    private String id;
    @DBRef
    User user;
    @DBRef
    Post post;
    String comment;
    private Number upvote;
    private Number downVote;
    @DBRef
    Comment reply;
    @DBRef
    List<User> likedBy;
    @DBRef
    List<User> dislikedBy;
    private Date createdAt;
    private Date updatedAt;
}
