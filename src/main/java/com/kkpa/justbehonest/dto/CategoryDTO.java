package com.kkpa.justbehonest.dto;

import java.io.Serializable;

public class CategoryDTO implements Serializable {

	private Long idCategory;
	
	private String name;
	
	private String type;

	public Long getIdCategory() {
		return idCategory;
	}

	public void setIdCategory(Long idCategory) {
		this.idCategory = idCategory;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "CategoryDTO [idCategory=" + idCategory + ", name=" + name + ", type=" + type + "]";
	}
	
	
	
}
