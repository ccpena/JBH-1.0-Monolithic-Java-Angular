package com.kkpa.justbehonest.converters;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.kkpa.justbehonest.dto.CategoryDTO;
import com.kkpa.justbehonest.entities.CategoryEntity;

@Component("categoryConv")
public class CategoryConverter implements ConverterJBH<CategoryDTO,CategoryEntity> {
	
	private ModelMapper mapper = new ModelMapper();

	@Override
	public CategoryDTO convertToDTO(CategoryEntity entity) {
		CategoryDTO dto = new CategoryDTO();
		
		dto = mapper.map(entity, CategoryDTO.class);
		
		return dto;
	}

	@Override
	public CategoryEntity convertToEntity(CategoryDTO dto) {
		CategoryEntity entity = new CategoryEntity();
		
		entity = mapper.map(dto, CategoryEntity.class);
		
		return entity;
	}

	
	
}
