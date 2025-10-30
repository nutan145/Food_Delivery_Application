package com.nt.io;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderRequest 
{
   private List<OrderItem> orderItems;
   private String userAddress;
   private Double amount;
   private String email;
   private String phoneNumber;
   private String orderStatus;
}
