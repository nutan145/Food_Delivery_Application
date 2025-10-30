package com.nt.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.nt.entity.FoodItem;
import com.nt.io.FoodRequest;
import com.nt.io.FoodResponse;

public interface IFoodItemService 
{
	public Map<String,String> uploadFile(MultipartFile file) throws Exception;
    public FoodResponse addFoodItem(FoodRequest req,MultipartFile file) throws Exception;
    public List<FoodResponse> readAllFoodItems();
    public FoodResponse readFoodItemById(String id);
    public FoodResponse updateFoodItemById(String id,FoodRequest req,MultipartFile file) throws Exception;
    public String deleteFoodItemById(String id) throws Exception;
    
}
