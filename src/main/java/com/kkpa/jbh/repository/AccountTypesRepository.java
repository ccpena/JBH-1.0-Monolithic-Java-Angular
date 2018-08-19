package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.AccountTypes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AccountTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountTypesRepository extends JpaRepository<AccountTypes, Long> {

}
