package com.kkpa.jbh.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
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

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToOne
    @JoinColumn(unique = true)
    private User userOwner;

    @OneToMany(mappedBy = "usersGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MembersGroup> members = new HashSet<>();

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

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public UsersGroup createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public UsersGroup updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUserOwner() {
        return userOwner;
    }

    public UsersGroup userOwner(User user) {
        this.userOwner = user;
        return this;
    }

    public void setUserOwner(User user) {
        this.userOwner = user;
    }

    public Set<MembersGroup> getMembers() {
        return members;
    }

    public UsersGroup members(Set<MembersGroup> membersGroups) {
        this.members = membersGroups;
        return this;
    }

    public UsersGroup addMembers(MembersGroup membersGroup) {
        this.members.add(membersGroup);
        membersGroup.setUsersGroup(this);
        return this;
    }

    public UsersGroup removeMembers(MembersGroup membersGroup) {
        this.members.remove(membersGroup);
        membersGroup.setUsersGroup(null);
        return this;
    }

    public void setMembers(Set<MembersGroup> membersGroups) {
        this.members = membersGroups;
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
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
