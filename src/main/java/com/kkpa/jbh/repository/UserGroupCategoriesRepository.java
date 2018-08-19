package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.UserGroupCategories;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserGroupCategories entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserGroupCategoriesRepository extends JpaRepository<UserGroupCategories, Long> {

}
