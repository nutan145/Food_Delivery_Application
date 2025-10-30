package com.nt.config;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.nt.filter.JwtAuthenticationFilter;
import com.nt.service.AppUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig 
{
	 @Autowired
	 private AppUserDetailsService userService;
	 
	 @Autowired
	 private JwtAuthenticationFilter jwtAuthenticationFilter;
	 
	 @Bean
     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
     {
    	 http.cors(cors->cors.configurationSource(corsConfigurationSource()))
    	 .csrf(csrf->csrf.disable())
    	 .authorizeHttpRequests(requests->requests
    	 .requestMatchers("/food-api/**","/user-api/register","/user-api/login","/user-api/get","/order-api/all","/order-api/status/**")
    	 .permitAll().anyRequest().authenticated())
    	 .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    	 .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    	 return http.build();
     }
     
     @Bean
     public PasswordEncoder passwordEncoder()
     {
    	 return new BCryptPasswordEncoder();
     }
     
     @Bean
     public CorsFilter corsFilter()
     {
    	  return new CorsFilter(corsConfigurationSource());
     }
     
     private  UrlBasedCorsConfigurationSource corsConfigurationSource()
     {
    	 CorsConfiguration config=new CorsConfiguration();
    	 config.setAllowedOrigins(List.of(
                  "http://localhost:5173",
                  "http://localhost:5174",
                  "https://food-delivery-applicatio-a34a6.web.app",
                  "https://food-delivery-customerspanel.web.app"  
          ));

    	 config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE"));
    	 config.setAllowedHeaders(List.of("Authorization","Content-Type"));
    	 config.setAllowCredentials(true);
    	 
    	 UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
    	 source.registerCorsConfiguration("/**", config);
    	 
    	 return source;
     }
     
     
     @Bean
     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception 
     {
         return config.getAuthenticationManager();
     }
}
























