package com.kkpa.jbh.config;

import java.time.Duration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;

@Configuration
@EnableCaching
public class CacheConfiguration {

  private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

  public CacheConfiguration(JHipsterProperties jHipsterProperties) {
    BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
    JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

    jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(CacheConfigurationBuilder
        .newCacheConfigurationBuilder(Object.class, Object.class,
            ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
        .withExpiry(ExpiryPolicyBuilder
            .timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
        .build());
  }

  @Bean
  public JCacheManagerCustomizer cacheManagerCustomizer() {
    return cm -> {
      cm.createCache(com.kkpa.jbh.repository.UserRepository.USERS_BY_LOGIN_CACHE,
          jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.repository.UserRepository.USERS_BY_EMAIL_CACHE,
          jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.User.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Authority.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.User.class.getName() + ".authorities",
          jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Categories.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Categories.class.getName() + ".subCategories",
          jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.SubCategories.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UsersGroup.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UserGroupCategories.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UserGroupCategories.class.getName() + ".idCategories",
          jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Accounts.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.AccountTypes.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.MovementesOutgoings.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.ActiveDebts.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Categories.class.getName() + ".subCategories", jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.Categories.class.getName() + ".usrGroupCategories", jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.MembersGroup.class.getName(), jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.MembersGroup.class.getName() + ".members", jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UsersGroup.class.getName() + ".members", jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UserGroupCategories.class.getName() + ".categories", jcacheConfiguration);
      cm.createCache(com.kkpa.jbh.domain.UserGroupAccount.class.getName(), jcacheConfiguration);
      // jhipster-needle-ehcache-add-entry
    };
  }
}
