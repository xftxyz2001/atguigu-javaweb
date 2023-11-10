package com.atguigu.headline.dao;

import com.atguigu.headline.pojo.NewsHeadline;
import com.atguigu.headline.pojo.vo.HeadlineDetailVo;
import com.atguigu.headline.pojo.vo.HeadlinePageVo;
import com.atguigu.headline.pojo.vo.HeadlineQueryVo;

import java.util.List;

public interface NewsHeadLineDao {
    List<NewsHeadline> findAll();

    int findPageCount(HeadlineQueryVo headLineQueryVo);

    List<HeadlinePageVo> findPageList(HeadlineQueryVo headLineQueryVo);

    HeadlineDetailVo findHeadlineDetail(Integer hid);

    int increasePageViews(Integer hid);

    int addNewsHeadline(NewsHeadline newsHeadline);

    NewsHeadline findHeadlineByHid(Integer hid);

    int updateNewsHeadline(NewsHeadline newsHeadline);

    int removeByHid(Integer hid);
}
