package com.nt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nt.entity.UserEntity;
import com.nt.io.UserRequest;
import com.nt.io.UserResponse;
import com.nt.repository.UserRepository;

@Service
public class UserServiceImpl implements IUserService
{
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationFacade authenticationFacade;

	@Override
	public UserResponse registerUser(UserRequest request) 
	{
		UserEntity details=convertToUserEntity(request);
		details=userRepo.save(details);
		return convertToUserResponse(details);
	}
	
	public UserEntity convertToUserEntity(UserRequest request)
	{
		return UserEntity.builder()
		       .name(request.getName())
		       .email(request.getEmail())
		       .password(passwordEncoder.encode(request.getPassword()))
		       .build();
	}
	
	public UserResponse convertToUserResponse(UserEntity details)
	{
		 return UserResponse.builder()
		        .id(details.getId())
		        .name(details.getName())
		        .email(details.getEmail())
		        .build();
	}

	@Override
	public String findByUserId() 
	{
		String loggedInUserEmail=authenticationFacade.getAuthentication().getName();
		UserEntity user=userRepo.findByEmail(loggedInUserEmail).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
		return user.getId();
	}

}




















