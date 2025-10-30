package com.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nt.entity.FoodItem;
import com.nt.io.FoodRequest;
import com.nt.io.FoodResponse;
import com.nt.repository.FoodItemsRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodItemServiceImp implements IFoodItemService
{
    @Autowired
    private FoodItemsRepository foodRepo;

    @Autowired
    private Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file) throws Exception {
        String publicId = "food/" + UUID.randomUUID();

        Map uploadResult = cloudinary.uploader().uploadLarge(file.getBytes(),
                ObjectUtils.asMap(
                    "public_id", publicId,
                    "resource_type", "auto"
                ));

        return Map.of(
            "imageUrl", (String) uploadResult.get("secure_url"),
            "publicId", publicId
        );
    }

    
    
	@Override
	public FoodResponse addFoodItem(FoodRequest req,MultipartFile file) throws Exception
	{
		FoodItem item=convertToFoodItem(req);
		Map<String,String> uploadData=uploadFile(file);
		item.setImageUrl(uploadData.get("imageUrl"));
		item.setPublicId(uploadData.get("publicId"));
		
		item=foodRepo.save(item);
		return convertToFoodResponse(item);
	}
	
	public FoodItem convertToFoodItem(FoodRequest req)
	{
		return FoodItem.builder()
		.name(req.getName())
		.description(req.getDescription())
		.price(req.getPrice())
		.category(req.getCategory()).build();
	}
	
	public FoodResponse convertToFoodResponse(FoodItem item)
	{
		return FoodResponse.builder()
		.id(item.getId())
		.name(item.getName())
		.description(item.getDescription())
		.price(item.getPrice())
		.category(item.getCategory())
		.imageUrl(item.getImageUrl()).build();
	}


	@Override
	public List<FoodResponse> readAllFoodItems() 
	{
		List<FoodItem> items=foodRepo.findAll();
		return items.stream().map(obj->convertToFoodResponse(obj)).collect(Collectors.toList());
	}


	@Override
	public FoodResponse readFoodItemById(String id) 
	{
		FoodItem item=foodRepo.findById(id).
				orElseThrow(()->new RuntimeException("food item not found for the id:"+id));
		return convertToFoodResponse(item);
	}
	
	
	@Override
	public FoodResponse updateFoodItemById(String id, FoodRequest request, MultipartFile file) throws Exception 
	{
		FoodItem item=foodRepo.findById(id).orElseThrow(()->new RuntimeException("food item not found for id:"+id));
		
		//update fields only non null
		if (request.getName() != null) {
	        item.setName(request.getName());
	    }

	    if (request.getDescription() != null) {
	        item.setDescription(request.getDescription());
	    }

	    if (request.getPrice() != 0.0) { // Assuming 0.0 is not a valid price
	        item.setPrice(request.getPrice());
	    }

	    if (request.getCategory() != null) {
	        item.setCategory(request.getCategory());
	    }
		
		if(file!=null && !file.isEmpty())
		{
			//delete old image from cloudinary
			if(item.getPublicId()!=null)
			{
				cloudinary.uploader().destroy(item.getPublicId(), ObjectUtils.emptyMap());
			}
			
			//add new image 
			Map<String,String> uploadData=uploadFile(file);
			item.setImageUrl(uploadData.get("imageUrl"));
			item.setPublicId(uploadData.get("publicId"));
			
		}
		
		FoodItem updated=foodRepo.save(item);
		
		return convertToFoodResponse(item);
	}


	@Override
	public String deleteFoodItemById(String id) throws Exception 
	{
		FoodItem item=foodRepo.findById(id).orElseThrow(()->new RuntimeException("food item not found for id:"+id));
		
		cloudinary.uploader().destroy(item.getPublicId(),ObjectUtils.emptyMap());
		
		foodRepo.delete(item);
		
		return "deleted image and item successfully";
	}


}
























