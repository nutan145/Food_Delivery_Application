package com.nt.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nt.entity.UserEntity;
import com.nt.repository.UserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService
{
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException 
	{
		UserEntity user=userRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
		
		return new User(user.getEmail(),user.getPassword(),Collections.emptyList());
	}

}
