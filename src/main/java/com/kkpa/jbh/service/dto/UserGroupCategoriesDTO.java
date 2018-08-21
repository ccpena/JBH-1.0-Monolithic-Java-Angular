package com.kkpa.jbh.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserGroupCategories entity.
 */
public class UserGroupCategoriesDTO implements Serializable {

    private Long id;

    private String name;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Long userGroupId;

    private Long categoryId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(Long usersGroupId) {
        this.userGroupId = usersGroupId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoriesId) {
        this.categoryId = categoriesId;
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
            ", name='" + getName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", userGroup=" + getUserGroupId() +
            ", category=" + getCategoryId() +
            "}";
    }
}
