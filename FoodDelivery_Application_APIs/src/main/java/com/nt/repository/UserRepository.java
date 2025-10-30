package com.nt.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.entity.UserEntity;

public interface UserRepository extends MongoRepository<UserEntity,String>
{
    public Optional<UserEntity> findByEmail(String mail);
}
