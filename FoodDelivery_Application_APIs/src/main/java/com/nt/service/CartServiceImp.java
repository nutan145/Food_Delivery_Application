package com.nt.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.CartEntity;
import com.nt.io.CartRequest;
import com.nt.io.CartResponse;
import com.nt.repository.CartRepository;

@Service
public class CartServiceImp implements ICartService
{
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private IUserService userService;

	@Override
	public CartResponse addToCart(CartRequest request) 
	{
		String loggedInUserId=userService.findByUserId();
		Optional<CartEntity> cartOptional=cartRepo.findByUserId(loggedInUserId);
		CartEntity cart=cartOptional.orElseGet(()->new CartEntity(loggedInUserId,new HashMap<>()));
		Map<String,Integer> cartItems=cart.getItems();
		cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0)+1);
		cart.setItems(cartItems);
		cart=cartRepo.save(cart);
		
		return convertToCartResponse(cart);
	}
	
	public CartResponse convertToCartResponse(CartEntity cartEntity)
	{
		return CartResponse.builder()
			   .id(cartEntity.getId())
			   .userId(cartEntity.getUserId())
			   .items(cartEntity.getItems())
			   .build();
	}

	@Override
	public CartResponse getCart() 
	{
		String loggedInUserId=userService.findByUserId();
		CartEntity entity=cartRepo.findByUserId(loggedInUserId).orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
		
		return convertToCartResponse(entity);
	}

	@Override
	public String deleteCart() 
	{
		String loggedInUserId=userService.findByUserId();
		cartRepo.deleteByUserId(loggedInUserId);
		return "user cart is removed";
	}

	@Override
	public CartResponse removeFromCart(CartRequest request) 
	{
		String loggedInUserId=userService.findByUserId();
		CartEntity entity=cartRepo.findByUserId(loggedInUserId).orElseThrow(()->new RuntimeException("Cart is not found"));
		Map<String,Integer> cartItems=entity.getItems();
		
		if(cartItems.containsKey(request.getFoodId()))
		{
			int quantity=cartItems.get(request.getFoodId());
			if(quantity>0)
			{
				cartItems.put(request.getFoodId(), quantity-1);
			}
			else
			{
				cartItems.remove(request.getFoodId());
			}
			entity=cartRepo.save(entity);
		}
		return convertToCartResponse(entity);
	}

	@Override
	public CartResponse setCartItemQuantity(CartRequest request) 
	{
		String loggedInUserId=userService.findByUserId();
		CartEntity entity=cartRepo.findByUserId(loggedInUserId).orElseThrow(()->new RuntimeException("Cart is not found"));
		Map<String,Integer> cartItems=entity.getItems();
		
		if(cartItems.containsKey(request.getFoodId()))
		{
			int quantity=cartItems.get(request.getFoodId());
			if(quantity>0)
			{
				cartItems.put(request.getFoodId(),0);
			}
			else
			{
				cartItems.remove(request.getFoodId());
			}
			entity=cartRepo.save(entity);
		}
		return convertToCartResponse(entity);
	}

}

















