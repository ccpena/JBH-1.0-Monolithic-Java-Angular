package com.kkpa.jbh.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserGroupCategories.
 */
@Entity
@Table(name = "user_group_categories")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserGroupCategories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup idUserGroup;

    @OneToMany(mappedBy = "userGroupCategories")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Categories> idCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsersGroup getIdUserGroup() {
        return idUserGroup;
    }

    public UserGroupCategories idUserGroup(UsersGroup usersGroup) {
        this.idUserGroup = usersGroup;
        return this;
    }

    public void setIdUserGroup(UsersGroup usersGroup) {
        this.idUserGroup = usersGroup;
    }

    public Set<Categories> getIdCategories() {
        return idCategories;
    }

    public UserGroupCategories idCategories(Set<Categories> categories) {
        this.idCategories = categories;
        return this;
    }

    public UserGroupCategories addIdCategory(Categories categories) {
        this.idCategories.add(categories);
        categories.setUserGroupCategories(this);
        return this;
    }

    public UserGroupCategories removeIdCategory(Categories categories) {
        this.idCategories.remove(categories);
        categories.setUserGroupCategories(null);
        return this;
    }

    public void setIdCategories(Set<Categories> categories) {
        this.idCategories = categories;
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
        UserGroupCategories userGroupCategories = (UserGroupCategories) o;
        if (userGroupCategories.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userGroupCategories.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserGroupCategories{" +
            "id=" + getId() +
            "}";
    }
}
