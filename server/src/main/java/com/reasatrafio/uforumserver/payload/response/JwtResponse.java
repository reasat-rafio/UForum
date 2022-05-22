package com.reasatrafio.uforumserver.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
	private String type = "Bearer";
	private String id;
	private String username;
	private String email;
}
