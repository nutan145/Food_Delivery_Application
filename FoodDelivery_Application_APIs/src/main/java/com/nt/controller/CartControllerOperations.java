package com.nt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nt.io.CartRequest;
import com.nt.io.CartResponse;
import com.nt.service.ICartService;

@RestController
@RequestMapping("/cart-api")
public class CartControllerOperations 
{
	@Autowired
	private ICartService service;
	
	@PostMapping("/add")
    public ResponseEntity<?> saveItemToCart(@RequestBody CartRequest request)
    {
    	try
    	{
    		String foodId=request.getFoodId();
    		if(foodId==null || foodId.isEmpty())
    		{
    			throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,"Food id is required");
    		}
    		
    		CartResponse response=service.addToCart(request);
    		System.out.println(response);
    		return new ResponseEntity<CartResponse>(response,HttpStatus.CREATED);
    		
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	@GetMapping("/get")
	public ResponseEntity<?> fetchCart()
	{
		try
		{
			CartResponse response=service.getCart();	
			System.out.println(response);
			return new ResponseEntity<CartResponse>(response,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/clear")
	public ResponseEntity<?> clearCart()
	{
		try
		{
			String msg=service.deleteCart();
			System.out.println(msg);
			return new ResponseEntity<String>(msg,HttpStatus.NO_CONTENT);
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/remove")
    public ResponseEntity<?> removeItemQuantityFromCart(@RequestBody CartRequest request)
    {
    	try
    	{
    		String foodId=request.getFoodId();
    		if(foodId==null || foodId.isEmpty())
    		{
    			throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,"Food id is required");
    		}
    		
    		CartResponse response=service.removeFromCart(request);
    		System.out.println(response);
    		return new ResponseEntity<CartResponse>(response,HttpStatus.OK);
    		
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	@PostMapping("/set")
    public ResponseEntity<?> setItemQunatity(@RequestBody CartRequest request)
    {
    	try
    	{
    		String foodId=request.getFoodId();
    		if(foodId==null || foodId.isEmpty())
    		{
    			throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,"Food id is required");
    		}
    		
    		CartResponse response=service.setCartItemQuantity(request);
    		System.out.println(response);
    		return new ResponseEntity<CartResponse>(response,HttpStatus.OK);
    		
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.getMessage());
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	
}
















