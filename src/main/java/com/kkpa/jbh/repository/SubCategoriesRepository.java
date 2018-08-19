package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.SubCategories;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubCategories entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubCategoriesRepository extends JpaRepository<SubCategories, Long> {

}
