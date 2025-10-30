package com.nt.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem 
{
   private String foodId;
   private String name;
   private String description;
   private String category;
   private Double price;
   private String imageUrl;
   private Integer quantity;
}
