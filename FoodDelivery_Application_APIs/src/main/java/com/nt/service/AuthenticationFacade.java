package com.nt.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade 
{
   public Authentication getAuthentication();
}
