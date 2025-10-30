package com.nt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nt.entity.FoodItem;

public interface FoodItemsRepository extends MongoRepository<FoodItem,String>
{

}
