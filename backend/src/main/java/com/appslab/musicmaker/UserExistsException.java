package com.appslab.musicmaker;

import org.springframework.security.core.AuthenticationException;

public class UserExistsException extends AuthenticationException {
    public UserExistsException(final String msg) {
        super(msg);
    }
}

