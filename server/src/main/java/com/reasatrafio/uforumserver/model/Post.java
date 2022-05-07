package com.reasatrafio.uforumserver.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
@JsonIdentityInfo(scope=Post.class, generator= ObjectIdGenerators.StringIdGenerator.class, property="id")
public class Post {
    @Id
    private String id;
    @DBRef
    private User postedBy;
    @DBRef
    private List<User> likedBy;
    @DBRef
    List<User> dislikedBy;
    private String title;
    @Indexed(unique = true)
    private String url;
    private String[] tags;
    private String description;
    private Boolean removed;
    private Number upvote;
    private Number downVote;
    @DBRef
    private List<Comment> comments;
    private Date createdAt;
    private Date updatedAt;
    private String posterId;

    public Post(User postedById, String title, String[] tags, String description, Number upvote, Number downVote,Date createdAt, List<User> likedBy) {
        this.postedBy = postedById;
        this.title = title;
        this.tags = tags;
        this.description = description;
        this.downVote = downVote;
        this.upvote = upvote;
        this.createdAt = createdAt;
        this.likedBy = likedBy;
    }



}
