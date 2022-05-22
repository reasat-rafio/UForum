package com.reasatrafio.uforumserver.exceptions;

public class PostCollectionException extends Exception {
    private static final long serialVersionUID = 1L;

    public PostCollectionException(String message) {
        super(message);
    }

    public static String NotFoundException(String id) {
        return "Post with "+id+" not found!";
    }

    public static String PostAlreadyExists() {
        return "Post with given name already exists";
    }
}
