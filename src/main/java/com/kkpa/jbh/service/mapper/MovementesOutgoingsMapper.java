package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MovementesOutgoings and its DTO MovementesOutgoingsDTO.
 */
@Mapper(componentModel = "spring", uses = {UserGroupAccountMapper.class, SubCategoriesMapper.class})
public interface MovementesOutgoingsMapper extends EntityMapper<MovementesOutgoingsDTO, MovementesOutgoings> {

    @Mapping(source = "userGroupAccount.id", target = "userGroupAccountId")
    @Mapping(source = "subCategory.id", target = "subCategoryId")
    MovementesOutgoingsDTO toDto(MovementesOutgoings movementesOutgoings);

    @Mapping(source = "userGroupAccountId", target = "userGroupAccount")
    @Mapping(source = "subCategoryId", target = "subCategory")
    MovementesOutgoings toEntity(MovementesOutgoingsDTO movementesOutgoingsDTO);

    default MovementesOutgoings fromId(Long id) {
        if (id == null) {
            return null;
        }
        MovementesOutgoings movementesOutgoings = new MovementesOutgoings();
        movementesOutgoings.setId(id);
        return movementesOutgoings;
    }
}
