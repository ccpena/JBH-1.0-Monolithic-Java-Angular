package com.kkpa.jbh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Accounts.
 */
@Entity
@Table(name = "accounts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Accounts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private AccountTypes type;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup idUsrGroup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountTypes getType() {
        return type;
    }

    public Accounts type(AccountTypes accountTypes) {
        this.type = accountTypes;
        return this;
    }

    public void setType(AccountTypes accountTypes) {
        this.type = accountTypes;
    }

    public UsersGroup getIdUsrGroup() {
        return idUsrGroup;
    }

    public Accounts idUsrGroup(UsersGroup usersGroup) {
        this.idUsrGroup = usersGroup;
        return this;
    }

    public void setIdUsrGroup(UsersGroup usersGroup) {
        this.idUsrGroup = usersGroup;
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
        Accounts accounts = (Accounts) o;
        if (accounts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accounts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Accounts{" +
            "id=" + getId() +
            "}";
    }
}
