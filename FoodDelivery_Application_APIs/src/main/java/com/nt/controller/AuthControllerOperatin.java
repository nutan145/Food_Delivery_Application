package com.nt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nt.io.AuthenticationRequest;
import com.nt.io.AuthenticationResponse;
import com.nt.service.AppUserDetailsService;
import com.nt.util.JwtUtil;

@RestController
@RequestMapping("/user-api")
public class AuthControllerOperatin 
{
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private AppUserDetailsService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody AuthenticationRequest request)
    {
    	try
    	{
    		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        	final UserDetails userDetails=userService.loadUserByUsername(request.getEmail());
            String jwtToken=jwtUtil.generateToken(userDetails);
        	
        	AuthenticationResponse response=new AuthenticationResponse(request.getEmail(),jwtToken);
        	System.out.println(response);
        	return new ResponseEntity<AuthenticationResponse>(response,HttpStatus.OK);
    	}
    	catch(Exception e)
    	{
    		System.out.println("Error:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    	
    }
}























