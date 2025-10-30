package com.nt.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.entity.CartEntity;

public interface CartRepository extends MongoRepository<CartEntity,String>
{
    public Optional<CartEntity> findByUserId(String userId);
    public String deleteByUserId(String userId);
}
