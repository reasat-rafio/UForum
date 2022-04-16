package com.reasatrafio.uforumserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Post {
    @Id
    private String id;
    @DBRef
    User postedById;
    private String name;
    @Indexed(unique = true)
    private String url;
    private String description;
    private Boolean removed;
    private Number upvote;
    private Number downVote;
}
