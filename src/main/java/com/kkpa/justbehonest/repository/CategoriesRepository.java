package com.kkpa.justbehonest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkpa.justbehonest.entities.CategoryEntity;

@Repository("categoryRepo")
public interface CategoriesRepository extends JpaRepository<CategoryEntity,Long> {
	
}
