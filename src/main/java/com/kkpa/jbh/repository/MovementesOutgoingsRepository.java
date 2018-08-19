package com.kkpa.jbh.repository;

import com.kkpa.jbh.domain.MovementesOutgoings;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovementesOutgoings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovementesOutgoingsRepository extends JpaRepository<MovementesOutgoings, Long> {

}
