package com.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nt.entity.FoodItem;
import com.nt.io.FoodRequest;
import com.nt.io.FoodResponse;
import com.nt.service.IFoodItemService;

@RestController
@CrossOrigin("*")
@RequestMapping("/food-api")
public class FoodItemsOperationController 
{
	@Autowired
	private IFoodItemService service;
	
	@Autowired
	private ObjectMapper map;
	
	@PostMapping("/add")
    public ResponseEntity<?> saveFoodItem(@RequestPart("food") String foodItem,
    		@RequestPart("image") MultipartFile file)
    {
		
    	try
    	{
    		FoodRequest request=map.readValue(foodItem,FoodRequest.class);
    		FoodResponse response=service.addFoodItem(request, file);
    		System.out.println(response);
    		return new ResponseEntity<FoodResponse>(response,HttpStatus.CREATED);
    	}
    	catch(Exception e)
    	{
    		System.out.println("error: adding the food item:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	@GetMapping("/all")
	public ResponseEntity<?> fetchAllFoodItems()
	{
		try
		{
		     List<FoodResponse> items=service.readAllFoodItems();	
		     System.out.println(items);
		     return new ResponseEntity<List<FoodResponse>>(items,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println("error: adding the food item:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<?> fetchFoodItem(@PathVariable String id)
	{
		try
		{
		     FoodResponse item=service.readFoodItemById(id);	
		     System.out.println(item);
		     return new ResponseEntity<FoodResponse>(item,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println("error: adding the food item:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> modifyFoodItemById(@PathVariable String id, @RequestPart("food") String updatedFoodItem,
			@RequestPart(value="image",required=false) MultipartFile file)
	{	
		try
		{
		    FoodRequest request=map.readValue(updatedFoodItem,FoodRequest.class);
		    FoodResponse response=service.updateFoodItemById(id, request, file);
		    System.out.println(response);
		    return new ResponseEntity<FoodResponse>(response,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println("error: adding the food item:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> removeFoodItemById(@PathVariable String id)
	{
		try
		{
		     String msg=service.deleteFoodItemById(id);
		     System.out.println(msg);
		     return new ResponseEntity<String>(msg,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println("error: adding the food item:"+e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}






















