package com.kkpa.justbehonest.converters;

public interface ConverterJBH<DTO,ENT> {

	DTO convertToDTO(ENT entity);
	
	ENT convertToEntity(DTO dto);
	
}
