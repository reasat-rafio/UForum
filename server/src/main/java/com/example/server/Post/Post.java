package com.example.server.Post;

import com.example.server.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public class Post {
    @Id
    private String id;
    private LocalDateTime created;
    private String Body;
    private Integer upvote;
    private Integer downVote;
    private User author;

    public Post(String id, LocalDateTime created, String body, Integer upvote, Integer downVote, User author) {
        this.id = id;
        this.created = created;
        Body = body;
        this.upvote = upvote;
        this.downVote = downVote;
        this.author = author;
    }

    public Post(LocalDateTime created, String body, Integer upvote, Integer downVote, User author) {
        this.created = created;
        Body = body;
        this.upvote = upvote;
        this.downVote = downVote;
        this.author = author;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public String getBody() {
        return Body;
    }

    public void setBody(String body) {
        Body = body;
    }

    public Integer getUpvote() {
        return upvote;
    }

    public void setUpvote(Integer upvote) {
        this.upvote = upvote;
    }

    public Integer getDownVote() {
        return downVote;
    }

    public void setDownVote(Integer downVote) {
        this.downVote = downVote;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", created=" + created +
                ", Body='" + Body + '\'' +
                ", upvote=" + upvote +
                ", downVote=" + downVote +
                ", author=" + author +
                '}';
    }
}


