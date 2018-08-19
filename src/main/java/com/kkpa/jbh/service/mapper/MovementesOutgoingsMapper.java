package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MovementesOutgoings and its DTO MovementesOutgoingsDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class, SubCategoriesMapper.class, AccountsMapper.class})
public interface MovementesOutgoingsMapper extends EntityMapper<MovementesOutgoingsDTO, MovementesOutgoings> {

    @Mapping(source = "idUserGroup.id", target = "idUserGroupId")
    @Mapping(source = "idSubCategory.id", target = "idSubCategoryId")
    @Mapping(source = "paymentMethod.id", target = "paymentMethodId")
    MovementesOutgoingsDTO toDto(MovementesOutgoings movementesOutgoings);

    @Mapping(source = "idUserGroupId", target = "idUserGroup")
    @Mapping(source = "idSubCategoryId", target = "idSubCategory")
    @Mapping(source = "paymentMethodId", target = "paymentMethod")
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
