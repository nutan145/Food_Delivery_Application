package com.nt.service;

import java.util.List;
import java.util.Map;

import com.nt.io.OrderRequest;
import com.nt.io.OrderResponse;
import com.razorpay.RazorpayException;

public interface IOrderService 
{
   public OrderResponse createOrderWithPayment(OrderRequest orderRequest) throws RazorpayException;
   public void verifyPayment(Map<String,String> paymentData,String status);
   public List<OrderResponse> getUserOrders();
   public void removeOrder(String orderId);
   public List<OrderResponse> getAllUsersOrders();
   public void updateOrderStatus(String orderId,String status);
}
