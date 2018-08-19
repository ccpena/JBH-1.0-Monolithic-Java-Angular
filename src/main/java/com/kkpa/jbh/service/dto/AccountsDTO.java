package com.kkpa.jbh.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Accounts entity.
 */
public class AccountsDTO implements Serializable {

    private Long id;

    private Long typeId;

    private Long idUsrGroupId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long accountTypesId) {
        this.typeId = accountTypesId;
    }

    public Long getIdUsrGroupId() {
        return idUsrGroupId;
    }

    public void setIdUsrGroupId(Long usersGroupId) {
        this.idUsrGroupId = usersGroupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AccountsDTO accountsDTO = (AccountsDTO) o;
        if (accountsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountsDTO{" +
            "id=" + getId() +
            ", type=" + getTypeId() +
            ", idUsrGroup=" + getIdUsrGroupId() +
            "}";
    }
}
