package com.kkpa.jbh.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AccountTypes entity.
 */
public class AccountTypesDTO implements Serializable {

    private Long id;

    private String description;

    private Boolean byDefault;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isByDefault() {
        return byDefault;
    }

    public void setByDefault(Boolean byDefault) {
        this.byDefault = byDefault;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AccountTypesDTO accountTypesDTO = (AccountTypesDTO) o;
        if (accountTypesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountTypesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountTypesDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", byDefault='" + isByDefault() + "'" +
            "}";
    }
}
