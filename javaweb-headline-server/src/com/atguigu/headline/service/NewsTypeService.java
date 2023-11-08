package com.atguigu.headline.service;

import com.atguigu.headline.pojo.NewsType;

import java.util.List;

public interface NewsTypeService {
    /**
     * 查询所有头条类型的方法
     * @return 多个头条类型以List<NewsType>集合形式返回
     */
    List<NewsType> findAll();
}
