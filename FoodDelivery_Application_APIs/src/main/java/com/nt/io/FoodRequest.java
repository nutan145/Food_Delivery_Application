package com.nt.io;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodRequest implements Serializable
{
	private String name;
    private String description;
    private double price;
    private String category;
}
