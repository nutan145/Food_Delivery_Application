package com.nt.io;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse implements Serializable
{
	private String id;
	private String name;
    private String description;
    private double price;
    private String category;
    private String imageUrl;
    
    
}
