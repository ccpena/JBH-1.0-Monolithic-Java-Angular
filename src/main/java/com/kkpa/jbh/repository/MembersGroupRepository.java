package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.MembersGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MembersGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembersGroupRepository extends JpaRepository<MembersGroup, Long> {

}
