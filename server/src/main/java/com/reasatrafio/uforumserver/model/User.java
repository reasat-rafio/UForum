package com.reasatrafio.uforumserver.model;

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
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String username;
    private String password;
    private boolean verified;
    @DBRef
    List<Post> posts;
    @DBRef
    List<Comment> comments;
    @DBRef
    List<Tag> followings;
    private Date createdAt;
    private Date updatedAt;
}
