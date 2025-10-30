package com.nt.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nt.entity.OrderEntity;
import com.nt.io.OrderRequest;
import com.nt.io.OrderResponse;
import com.nt.repository.CartRepository;
import com.nt.repository.OrdersRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class OrderServiceImp implements IOrderService
{
	@Autowired
    private OrdersRepository orderRepo;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private CartRepository cartRepo;;
	
	@Value("${razorpay.key_id}")
	private String razorpayKeyId;
	
	@Value("${razorpay.secrete_key}")
	private String razorpaySecreteKey;
	
	@Override
	public OrderResponse createOrderWithPayment(OrderRequest orderRequest) throws RazorpayException 
	{
		OrderEntity newOrder=convertToOrderEntity(orderRequest);
		newOrder=orderRepo.save(newOrder);
		
		RazorpayClient razorpayClient=new RazorpayClient(razorpayKeyId,razorpaySecreteKey);
		JSONObject request=new JSONObject();
		request.put("amount", newOrder.getAmount()*100);
		request.put("currency", "INR");
		request.put("payment_capture", 1);
		Order razorpayOrder=razorpayClient.orders.create(request);
		
		newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
		
		String loggedInUserId=userService.findByUserId();
		newOrder.setUserId(loggedInUserId);
		newOrder=orderRepo.save(newOrder);
		
		return convertToOrderResponse(newOrder);
	}
	
	public OrderEntity convertToOrderEntity(OrderRequest orderRequest)
	{
		return OrderEntity.builder()
				.userAddress(orderRequest.getUserAddress())
				.orderItems(orderRequest.getOrderItems())
				.amount(orderRequest.getAmount())
				.email(orderRequest.getEmail())
				.phoneNumber(orderRequest.getPhoneNumber())
				.orderStatus(orderRequest.getOrderStatus())
				.build();
	}
	
	public OrderResponse convertToOrderResponse(OrderEntity newOrder)
	{
		return OrderResponse.builder()
				.id(newOrder.getId())
				.userId(newOrder.getUserId())
				.userAddress(newOrder.getUserAddress())
				.phoneNumber(newOrder.getPhoneNumber())
				.email(newOrder.getEmail())
				.amount(newOrder.getAmount())
				.razorpayOrderId(newOrder.getRazorpayOrderId())
				.paymentStatus(newOrder.getPaymentStatus())
				.orderStatus(newOrder.getOrderStatus())
				.orderItems(newOrder.getOrderItems())
				.build();
	}

	@Override
	public void verifyPayment(Map<String, String> paymentData, String status) 
	{
		String razorpay_order_id=paymentData.get("razorpay_order_id");
		OrderEntity existingOrder=orderRepo.findByRazorpayOrderId(razorpay_order_id)
				.orElseThrow(()->new RuntimeException("order not found"));
		
		existingOrder.setPaymentStatus(status);
		existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
		existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
		orderRepo.save(existingOrder);
		
		if("paid".equalsIgnoreCase(status))
		{
			cartRepo.deleteByUserId(existingOrder.getUserId());
		}
	}

	@Override
	public List<OrderResponse> getUserOrders() 
	{
		String loggedInUserId=userService.findByUserId();
		List<OrderEntity> list=orderRepo.findByUserId(loggedInUserId);
		
		return list.stream().map(entity->convertToOrderResponse(entity)).collect(Collectors.toList());
	}

	@Override
	public void removeOrder(String orderId) 
	{
		orderRepo.deleteById(orderId);
	}

	@Override
	public List<OrderResponse> getAllUsersOrders() 
	{
		List<OrderEntity> list=orderRepo.findAll();
		
		return list.stream().map(entity->convertToOrderResponse(entity)).collect(Collectors.toList());
	}

	@Override
	public void updateOrderStatus(String orderId, String status) 
	{
		OrderEntity entity=orderRepo.findById(orderId).orElseThrow(()->new RuntimeException("order not found"));
		entity.setOrderStatus(status);
		orderRepo.save(entity);
	}

}

























