package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.UserGroupCategoriesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserGroupCategories and its DTO UserGroupCategoriesDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class, CategoriesMapper.class})
public interface UserGroupCategoriesMapper extends EntityMapper<UserGroupCategoriesDTO, UserGroupCategories> {

    @Mapping(source = "userGroup.id", target = "userGroupId")
    @Mapping(source = "category.id", target = "categoryId")
    UserGroupCategoriesDTO toDto(UserGroupCategories userGroupCategories);

    @Mapping(source = "userGroupId", target = "userGroup")
    @Mapping(source = "categoryId", target = "category")
    UserGroupCategories toEntity(UserGroupCategoriesDTO userGroupCategoriesDTO);

    default UserGroupCategories fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserGroupCategories userGroupCategories = new UserGroupCategories();
        userGroupCategories.setId(id);
        return userGroupCategories;
    }
}
