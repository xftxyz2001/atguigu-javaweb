package com.atguigu.headline.dao;

import com.atguigu.headline.pojo.NewsType;

import java.util.List;

public interface NewsTypeDao {
    /**
     *
     * @return
     */
    List<NewsType> findAll();
}
