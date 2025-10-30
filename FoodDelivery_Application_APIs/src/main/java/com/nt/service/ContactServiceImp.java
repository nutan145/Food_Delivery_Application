package com.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.ContactEntity;
import com.nt.io.ContactRequest;
import com.nt.repository.ContactRepository;

@Service
public class ContactServiceImp implements IContactService
{
	@Autowired
	private ContactRepository contactRepo;

	@Override
	public String userIssueDetails(ContactRequest request) 
	{
		ContactEntity entity=convertToContactEntity(request);
		entity=contactRepo.save(entity);
		return entity.getEmail()+" mail id..."+entity.getFirstName()+" user issue details are received";
	}
	
	public ContactEntity convertToContactEntity(ContactRequest request)
	{
		return ContactEntity.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.email(request.getEmail())
				.message(request.getMessage())
				.build();
	}

}
