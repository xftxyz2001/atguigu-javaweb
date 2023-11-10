package com.atguigu.headline.test;

import com.atguigu.headline.pojo.vo.HeadlineQueryVo;
import com.atguigu.headline.service.NewsHeadlineService;
import com.atguigu.headline.service.impl.NewsHeadlineServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.util.Map;

public class TestJackson {


    @Test
    public void testA() throws JsonProcessingException {
        NewsHeadlineService newsHeadlineService =new NewsHeadlineServiceImpl();

        HeadlineQueryVo headLineQueryVo =new HeadlineQueryVo();
        headLineQueryVo.setKeyWords("");
        headLineQueryVo.setType(1);
        headLineQueryVo.setPageNum(1);
        headLineQueryVo.setPageSize(3);

        Map<String, Object> page = newsHeadlineService.findPage(headLineQueryVo);
        ObjectMapper objectMapper =new ObjectMapper();
        String json = objectMapper.writeValueAsString(page);
        System.out.println(json);

    }
}
