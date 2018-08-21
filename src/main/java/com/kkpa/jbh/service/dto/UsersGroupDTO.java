package com.kkpa.jbh.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UsersGroup entity.
 */
public class UsersGroupDTO implements Serializable {

    private Long id;

    private String name;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Long userOwnerId;

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

    public Long getUserOwnerId() {
        return userOwnerId;
    }

    public void setUserOwnerId(Long userId) {
        this.userOwnerId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UsersGroupDTO usersGroupDTO = (UsersGroupDTO) o;
        if (usersGroupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usersGroupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsersGroupDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", userOwner=" + getUserOwnerId() +
            "}";
    }
}
