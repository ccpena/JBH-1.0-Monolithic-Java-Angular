package com.kkpa.jbh.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UsersGroup entity.
 */
public class UsersGroupDTO implements Serializable {

    private Long id;

    private String name;

    private Boolean invitationAccepted;

    private Long idUserOwnerId;

    private Long idUserInvitedId;

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

    public Boolean isInvitationAccepted() {
        return invitationAccepted;
    }

    public void setInvitationAccepted(Boolean invitationAccepted) {
        this.invitationAccepted = invitationAccepted;
    }

    public Long getIdUserOwnerId() {
        return idUserOwnerId;
    }

    public void setIdUserOwnerId(Long userId) {
        this.idUserOwnerId = userId;
    }

    public Long getIdUserInvitedId() {
        return idUserInvitedId;
    }

    public void setIdUserInvitedId(Long userId) {
        this.idUserInvitedId = userId;
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
            ", invitationAccepted='" + isInvitationAccepted() + "'" +
            ", idUserOwner=" + getIdUserOwnerId() +
            ", idUserInvited=" + getIdUserInvitedId() +
            "}";
    }
}
