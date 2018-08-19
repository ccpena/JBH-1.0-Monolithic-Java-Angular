package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.UsersGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UsersGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsersGroupRepository extends JpaRepository<UsersGroup, Long> {

}
