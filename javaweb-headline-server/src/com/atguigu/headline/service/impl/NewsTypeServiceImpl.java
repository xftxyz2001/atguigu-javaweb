package com.atguigu.headline.service.impl;

import com.atguigu.headline.dao.NewsTypeDao;
import com.atguigu.headline.dao.impl.NewsTypeDaoImpl;
import com.atguigu.headline.pojo.NewsType;
import com.atguigu.headline.service.NewsTypeService;

import java.util.List;

public class NewsTypeServiceImpl implements NewsTypeService {
    private NewsTypeDao typeDao =new NewsTypeDaoImpl();
    @Override
    public List<NewsType> findAll() {
        return typeDao.findAll();
    }
}
