package com.nt.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="contacts")
public class ContactEntity 
{
   @Id
   private String id;
   private String firstName;
   private String lastName;
   private String email;
   private String message; 
}
