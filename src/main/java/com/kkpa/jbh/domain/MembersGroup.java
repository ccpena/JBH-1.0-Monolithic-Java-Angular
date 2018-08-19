package com.kkpa.jbh.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MembersGroup.
 */
@Entity
@Table(name = "members_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MembersGroup implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  @Column(name = "invitation_accepted")
  private Boolean invitationAccepted;

  @OneToOne
  @JoinColumn(unique = true)
  private UsersGroup idUserGroup;

  @OneToOne
  @JoinColumn(name = "id")
  private User idUserOwner;

  @OneToOne
  @JoinColumn(name = "id")
  private User idUserInvited;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Boolean isInvitationAccepted() {
    return invitationAccepted;
  }

  public MembersGroup invitationAccepted(Boolean invitationAccepted) {
    this.invitationAccepted = invitationAccepted;
    return this;
  }

  public void setInvitationAccepted(Boolean invitationAccepted) {
    this.invitationAccepted = invitationAccepted;
  }

  public UsersGroup getIdUserGroup() {
    return idUserGroup;
  }

  public MembersGroup idUserGroup(UsersGroup usersGroup) {
    this.idUserGroup = usersGroup;
    return this;
  }

  public void setIdUserGroup(UsersGroup usersGroup) {
    this.idUserGroup = usersGroup;
  }

  public User getIdUserOwner() {
    return idUserOwner;
  }

  public MembersGroup idUserOwner(User user) {
    this.idUserOwner = user;
    return this;
  }

  public void setIdUserOwner(User user) {
    this.idUserOwner = user;
  }

  public User getIdUserInvited() {
    return idUserInvited;
  }

  public MembersGroup idUserInvited(User user) {
    this.idUserInvited = user;
    return this;
  }

  public void setIdUserInvited(User user) {
    this.idUserInvited = user;
  }
  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not
  // remove

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MembersGroup membersGroup = (MembersGroup) o;
    if (membersGroup.getId() == null || getId() == null) {
      return false;
    }
    return Objects.equals(getId(), membersGroup.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getId());
  }

  @Override
  public String toString() {
    return "MembersGroup{" + "id=" + getId() + ", invitationAccepted='" + isInvitationAccepted()
        + "'" + "}";
  }
}
