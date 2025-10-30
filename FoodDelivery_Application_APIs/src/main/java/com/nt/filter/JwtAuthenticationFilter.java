package com.nt.filter;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import com.nt.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException 
	{
	    final String authHeader=request.getHeader("Authorization");	
	    
	  try 
	  {
	    if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer"))
	    {
	    	String token=authHeader.substring(7);
	    	
	    		String email=jwtUtil.extractUsername(token);
		    	
		    	if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		    	{
		    		UserDetails userDetails=userDetailsService.loadUserByUsername(email);
		    		
		    		if(jwtUtil.validateToken(token, userDetails))
		    		{
		    			UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
		    					userDetails,null,userDetails.getAuthorities());
		    			
		    			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		    			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		    		}
		    		
		    	
	    	}
	    	
	    }
	    filterChain.doFilter(request, response);
	    }
	    catch(ExpiredJwtException e)
    	{
    		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"token expired");
    	}
	    catch (Exception e) 
	  {
	        // Handle other JWT exceptions
	        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	        response.getWriter().write("Invalid token");
	    }
	}

}














