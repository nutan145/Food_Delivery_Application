package com.nt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nt.io.OrderRequest;
import com.nt.io.OrderResponse;
import com.nt.service.IOrderService;

@RestController
@RequestMapping("/order-api")
public class OrderControllerOperation 
{
   @Autowired
   private IOrderService orderService;
   
   @PostMapping("/create")
   public ResponseEntity<?> creatingOrderWithPayment(@RequestBody OrderRequest request)
   {
	   try
	   {
		   OrderResponse response=orderService.createOrderWithPayment(request);
		   System.out.println(response);
		   return new ResponseEntity<OrderResponse>(response,HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while create the order:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   @PostMapping("/verify")
   public ResponseEntity<?> verifyPaymentDetails(@RequestBody Map<String,String> paymentData)
   {
	   try
	   {
		   orderService.verifyPayment(paymentData,"paid");
		   System.out.println("payment verified successfully");
		   return new ResponseEntity<String>("paymet verified successfully",HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while verifying the payment details:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   @GetMapping("/get")
   public ResponseEntity<?> fetchUserOrders()
   {
	   try
	   {
		   List<OrderResponse> response=orderService.getUserOrders();
		   System.out.println(response);
		   return new ResponseEntity<List<OrderResponse>>(response,HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while getting the user orders:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   @DeleteMapping("/remove/{orderId}")
   public ResponseEntity<?> deleteOrder(@PathVariable String orderId)
   {
	   try
	   {
		   orderService.removeOrder(orderId);
		   System.out.println("order removed");
		   return new ResponseEntity<String>("order removed",HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while getting the user orders:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   //this is for admin
   @GetMapping("/all")
   public ResponseEntity<?> fetchAllUsersOrders()
   {
	   try
	   {
		   List<OrderResponse> response=orderService.getAllUsersOrders();
		   System.out.println(response);
		   return new ResponseEntity<List<OrderResponse>>(response,HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while getting the all users orders:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   //this is for admin
   @PatchMapping("/status/{orderId}")
   public ResponseEntity<String> updatingOrderStatus(@PathVariable String orderId,@RequestParam String status)
   {
	   try
	   {
		   orderService.updateOrderStatus(orderId,status);
		   System.out.println("order status:"+status);
		   return new ResponseEntity<String>("order status:"+status,HttpStatus.OK);
	   }
	   catch(Exception e)
	   {
		  System.out.println("Error while updating  the order status:"+e.getMessage());
		  return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
}











