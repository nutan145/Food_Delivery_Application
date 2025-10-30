package com.nt.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationFacadeImp implements AuthenticationFacade
{

	@Override
	public Authentication getAuthentication() 
	{
		return SecurityContextHolder.getContext().getAuthentication();
	}

}
