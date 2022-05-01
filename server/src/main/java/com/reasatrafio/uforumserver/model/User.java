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
@JsonIdentityInfo(scope=User.class, generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String username;
    private String password;
    private boolean verified;
    private String imageUrl;
    @DBRef
    List<Post> posts;
    @DBRef
    List<Post> likedPost;
    @DBRef
    List<Post> dislikedPost;
    @DBRef
    List<Comment> comments;
    @DBRef
    List<Comment> likedComments;
    @DBRef
    List<Comment> dislikedComments;
    @DBRef
    List<Tag> followings;
    private Date createdAt;
    private Date updatedAt;

    @Override
    public String toString() {
        return "[{" +
                "id:'" + id + '\'' +
                ", email:'" + email + '\'' +
                ", username:'" + username + '\'' +
                ", password:'" + password + '\'' +
                ", verified:" + verified +
                ", posts:" + posts +
                ", comments:" + comments +
                ", followings:" + followings +
                ", createdAt:" + createdAt +
                ", updatedAt:" + updatedAt +
                "}]";
    }
}
