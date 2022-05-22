package com.reasatrafio.uforumserver.exceptions;

public class UserCollectionException extends Exception {
   private static final long serialVersionUID = 1L;

    public UserCollectionException(String message) {
        super(message);
    }

    public static String NotFoundException(String id) {
        return "User with "+id+" not found!";
    }

    public static String PasswordMissMatch() {
        return "Password miss match";
    }
    
    public static String UserNameTaken() {
        return "This username already registered";
    }

    public static String EmailTaken() {
        return "There is already an account registered with this email";
    }

    public static String UserAlreadyExists() {
        return "Todo with given name already exists";
    }  
}
