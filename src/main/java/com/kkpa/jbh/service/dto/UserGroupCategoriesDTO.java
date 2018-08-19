package com.kkpa.jbh.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserGroupCategories entity.
 */
public class UserGroupCategoriesDTO implements Serializable {

    private Long id;

    private Long idUserGroupId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdUserGroupId() {
        return idUserGroupId;
    }

    public void setIdUserGroupId(Long usersGroupId) {
        this.idUserGroupId = usersGroupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserGroupCategoriesDTO userGroupCategoriesDTO = (UserGroupCategoriesDTO) o;
        if (userGroupCategoriesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userGroupCategoriesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserGroupCategoriesDTO{" +
            "id=" + getId() +
            ", idUserGroup=" + getIdUserGroupId() +
            "}";
    }
}
