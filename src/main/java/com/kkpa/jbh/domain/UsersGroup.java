package com.kkpa.jbh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UsersGroup.
 */
@Entity
@Table(name = "users_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UsersGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "invitation_accepted")
    private Boolean invitationAccepted;

    @OneToOne
    @JoinColumn(unique = true)
    private User idUserOwner;

    @OneToOne
    @JoinColumn(unique = true)
    private User idUserInvited;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UsersGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isInvitationAccepted() {
        return invitationAccepted;
    }

    public UsersGroup invitationAccepted(Boolean invitationAccepted) {
        this.invitationAccepted = invitationAccepted;
        return this;
    }

    public void setInvitationAccepted(Boolean invitationAccepted) {
        this.invitationAccepted = invitationAccepted;
    }

    public User getIdUserOwner() {
        return idUserOwner;
    }

    public UsersGroup idUserOwner(User user) {
        this.idUserOwner = user;
        return this;
    }

    public void setIdUserOwner(User user) {
        this.idUserOwner = user;
    }

    public User getIdUserInvited() {
        return idUserInvited;
    }

    public UsersGroup idUserInvited(User user) {
        this.idUserInvited = user;
        return this;
    }

    public void setIdUserInvited(User user) {
        this.idUserInvited = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UsersGroup usersGroup = (UsersGroup) o;
        if (usersGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usersGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsersGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", invitationAccepted='" + isInvitationAccepted() + "'" +
            "}";
    }
}
