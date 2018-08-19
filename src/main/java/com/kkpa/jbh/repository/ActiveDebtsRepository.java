package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.ActiveDebts;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ActiveDebts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActiveDebtsRepository extends JpaRepository<ActiveDebts, Long> {

}
