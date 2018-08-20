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

  private String idUserOwnerId;

  private String idUserInvitedId;

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
    return "UsersGroupDTO{" + "id=" + getId() + ", name='" + getName() + "'"
        + ", invitationAccepted='" + getInvitationAccepted() + "'" + ", idUserOwner="
        + getIdUserOwnerId() + ", idUserInvited=" + getIdUserInvitedId() + "}";
  }

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

  public Boolean getInvitationAccepted() {
    return invitationAccepted;
  }

  public void setInvitationAccepted(Boolean invitationAccepted) {
    this.invitationAccepted = invitationAccepted;
  }

  public String getIdUserOwnerId() {
    return idUserOwnerId;
  }

  public void setIdUserOwnerId(String idUserOwnerId) {
    this.idUserOwnerId = idUserOwnerId;
  }

  public String getIdUserInvitedId() {
    return idUserInvitedId;
  }

  public void setIdUserInvitedId(String idUserInvitedId) {
    this.idUserInvitedId = idUserInvitedId;
  }


}
