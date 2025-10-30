package com.nt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.entity.OrderEntity;

public interface OrdersRepository extends MongoRepository<OrderEntity,String>
{
   public List<OrderEntity> findByUserId(String userId);
   public Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);
}
