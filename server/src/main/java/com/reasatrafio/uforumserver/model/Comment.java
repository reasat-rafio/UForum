package com.reasatrafio.uforumserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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
    String comment;
    private Number upvote;
    private Number downVote;
}
