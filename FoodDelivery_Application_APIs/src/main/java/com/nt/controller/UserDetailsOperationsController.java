package com.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nt.io.UserRequest;
import com.nt.io.UserResponse;
import com.nt.service.IUserService;

@RestController
@RequestMapping("/user-api")
@CrossOrigin("*")
public class UserDetailsOperationsController 
{
	@Autowired
	private IUserService service;
	
   @PostMapping("/register")
   public ResponseEntity<?> userRegistration(@RequestBody UserRequest request)
   {   
	   try
	   {
		   UserResponse response=service.registerUser(request);
		   System.out.println(response);
		   return new ResponseEntity<UserResponse>(response,HttpStatus.CREATED);
	   }
	   catch(Exception e)
	   {
		   System.out.println("Error:while register the user:"+e.getMessage());
		   return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   
}








