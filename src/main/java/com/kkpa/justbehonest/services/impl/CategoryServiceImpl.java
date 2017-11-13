package com.kkpa.justbehonest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.kkpa.justbehonest.entities.CategoryEntity;
import com.kkpa.justbehonest.repository.CategoriesRepository;
import com.kkpa.justbehonest.services.CategoryService;


@Service("srvCategory")
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	@Qualifier("categoryRepo")
	private CategoriesRepository categoryRepo;

	@Override
	public CategoryEntity save(CategoryEntity category) {
		
		categoryRepo.save(category);
		
		return category;
		
	}
	
	

}
