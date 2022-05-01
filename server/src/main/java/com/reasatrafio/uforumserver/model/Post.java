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

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
@JsonIdentityInfo(scope=Post.class, generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Post {
    @Id
    private String id;
    @DBRef
    User postedById;
    @DBRef
    List<User> likedBy;
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
    List<Comment> comments;
    private Date createdAt;
    private Date updatedAt;

    @Override
    public String toString() {
        return "[{" +
                "id:'" + id + '\'' +
                ", postedById:" + postedById +
                ", title:'" + title + '\'' +
                ", url:'" + url + '\'' +
                ", tags:" + Arrays.toString(tags) +
                ", description:'" + description + '\'' +
                ", removed:" + removed +
                ", upvote:" + upvote +
                ", downVote:" + downVote +
                ", comments:" + comments +
                ", createdAt:" + createdAt +
                ", updatedAt:" + updatedAt +
                "}]";
    }
}
