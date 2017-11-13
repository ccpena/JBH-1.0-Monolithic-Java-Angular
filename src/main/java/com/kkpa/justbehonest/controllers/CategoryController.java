package com.kkpa.justbehonest.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkpa.justbehonest.converters.CategoryConverter;
import com.kkpa.justbehonest.dto.CategoryDTO;
import com.kkpa.justbehonest.entities.CategoryEntity;
import com.kkpa.justbehonest.services.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	private static final Log LOGGER = LogFactory.getLog(CategoryController.class);
	
	@Autowired
	@Qualifier("srvCategory")
	private CategoryService srvCategory;
	
	@Autowired
	@Qualifier("categoryConv")
	private CategoryConverter converter;

	@PostMapping("/add")
	public CategoryDTO createCategory(@RequestBody CategoryDTO categDTO) {
		LOGGER.info("[createCategory] INICIO " + categDTO.toString());
		
		CategoryEntity categoryEntity = srvCategory.save(converter.convertToEntity(categDTO));
		
		categDTO = converter.convertToDTO(categoryEntity);
		
		LOGGER.info("[createCategory] FIN");
		
		return categDTO;
	}
	
	
}
