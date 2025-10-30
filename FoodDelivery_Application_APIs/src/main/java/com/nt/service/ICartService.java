package com.nt.service;

import com.nt.io.CartRequest;
import com.nt.io.CartResponse;

public interface ICartService 
{
    public CartResponse addToCart(CartRequest request);
    public CartResponse getCart();
    public String deleteCart();
    public CartResponse removeFromCart(CartRequest request);
    public CartResponse setCartItemQuantity(CartRequest request );
}
