package com.reasatrafio.uforumserver.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.reasatrafio.uforumserver.exceptions.UserCollectionException;
import com.reasatrafio.uforumserver.models.User;
import com.reasatrafio.uforumserver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    BCryptPasswordEncoder b = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User findUserById(String userId) throws UserCollectionException {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new UserCollectionException(UserCollectionException.NotFoundException(userId));
        }
        return user.get();
    }

    public User login(User user) throws UserCollectionException {
        List<User> userByEmail = userRepo.findByEmail(user.getEmail());
        if (userByEmail.isEmpty()) {
            throw new UserCollectionException(UserCollectionException.NotFoundException(user.getId()));
        }

        boolean passwordMatched = b.matches(user.getPassword(), userByEmail.get(0).getPassword());

        if (!passwordMatched) {
            throw new UserCollectionException(UserCollectionException.PasswordMissMatch());
        }

        return userByEmail.get(0);
    }
    
    public User register(User user) throws UserCollectionException {
        List<User> checkByEmail = userRepo.findByEmail(user.getEmail());
        Optional<User> checkByUsername = userRepo.findByUsername(user.getUsername());

        boolean emailExist = checkByEmail.size() >= 1;
        boolean usernameExist = checkByUsername.isPresent();

        if (emailExist)
            throw new UserCollectionException(UserCollectionException.EmailTaken());

        if (usernameExist)
            throw new UserCollectionException(UserCollectionException.UserNameTaken());
        
        String hashPassword = new BCryptPasswordEncoder().encode(user.getPassword());

        user.setPassword(hashPassword);
        user.setCreatedAt(new Date(System.currentTimeMillis()));
        user.setVerified(false);
        return userRepo.save(user);

    }

}
