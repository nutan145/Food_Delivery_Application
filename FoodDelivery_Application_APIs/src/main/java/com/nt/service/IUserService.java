package com.nt.service;

import java.util.List;

import com.nt.io.UserRequest;
import com.nt.io.UserResponse;

public interface IUserService 
{
   public UserResponse registerUser(UserRequest request);
   public String findByUserId();
}
