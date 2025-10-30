package com.nt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.entity.ContactEntity;

public interface ContactRepository extends MongoRepository<ContactEntity,String>{

}
