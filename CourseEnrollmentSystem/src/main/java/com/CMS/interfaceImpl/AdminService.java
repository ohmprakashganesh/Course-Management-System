package com.CMS.interfaceImpl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Interface.AdminInterface;
import com.CMS.entities.Admin;
import com.CMS.repositories.AdminRepo;


@Service
public class AdminService implements AdminInterface{
	
     @Autowired
	private AdminRepo repo;

	@Override
	public Admin saveAdmin(Admin admin) {
		
		Admin obj=repo.save(admin);
		return obj;
	}
     
   

	
}
