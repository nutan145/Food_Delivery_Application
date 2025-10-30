package com.nt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nt.io.ContactRequest;
import com.nt.service.IContactService;

@RestController
@RequestMapping("/contact-api")
public class ContactOperationsController 
{
	@Autowired
    private IContactService service;
	
	@PostMapping("/details")
	public ResponseEntity<String> userProblemsDetails(@RequestBody ContactRequest request)
	{
		try
		{
			String msg=service.userIssueDetails(request);
			System.out.println(msg);
			return new ResponseEntity<String>(msg,HttpStatus.CREATED);
		}
		catch(Exception e)
		{
		     System.out.println(e.getMessage());
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
