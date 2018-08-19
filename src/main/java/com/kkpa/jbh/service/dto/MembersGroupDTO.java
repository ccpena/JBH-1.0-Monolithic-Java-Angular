package com.kkpa.jbh.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MembersGroup entity.
 */
public class MembersGroupDTO implements Serializable {

    private Long id;

    private Boolean invitationAccepted;

    private Long idUserGroupId;

    private Long idUserOwnerId;

    private Long idUserInvitedId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isInvitationAccepted() {
        return invitationAccepted;
    }

    public void setInvitationAccepted(Boolean invitationAccepted) {
        this.invitationAccepted = invitationAccepted;
    }

    public Long getIdUserGroupId() {
        return idUserGroupId;
    }

    public void setIdUserGroupId(Long usersGroupId) {
        this.idUserGroupId = usersGroupId;
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

        MembersGroupDTO membersGroupDTO = (MembersGroupDTO) o;
        if (membersGroupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), membersGroupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MembersGroupDTO{" +
            "id=" + getId() +
            ", invitationAccepted='" + isInvitationAccepted() + "'" +
            ", idUserGroup=" + getIdUserGroupId() +
            ", idUserOwner=" + getIdUserOwnerId() +
            ", idUserInvited=" + getIdUserInvitedId() +
            "}";
    }
}
