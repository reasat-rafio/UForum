package com.reasatrafio.uforumserver.models;

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
public class Tag {
    @Id
    private String id;
    @Indexed(unique = true)
    private String title;
    @DBRef
    List<Post> posts;
    @DBRef
    List<User> followedBy;
    private Date createdAt;
    private Date updatedAt;
}
