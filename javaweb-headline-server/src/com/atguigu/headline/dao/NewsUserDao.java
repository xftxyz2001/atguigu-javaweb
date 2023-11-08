package com.atguigu.headline.dao;

import com.atguigu.headline.pojo.NewsUser;

public interface NewsUserDao {
    /**
     *
     * @param username
     * @return
     */
    NewsUser findByUsername(String username);

    /**
     *
     * @param userId
     * @return
     */
    NewsUser findByUid(Integer userId);

    /**
     *
     * @param registUser
     * @return
     */
    Integer insertUser(NewsUser registUser);
}
