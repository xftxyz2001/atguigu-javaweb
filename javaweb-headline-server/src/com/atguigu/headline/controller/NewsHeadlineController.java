package com.atguigu.headline.controller;

import com.atguigu.headline.common.Result;
import com.atguigu.headline.pojo.NewsHeadline;
import com.atguigu.headline.service.NewsHeadlineService;
import com.atguigu.headline.service.impl.NewsHeadlineServiceImpl;
import com.atguigu.headline.util.JwtHelper;
import com.atguigu.headline.util.WebUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/headline/*")
public class NewsHeadlineController extends BaseController{
    private NewsHeadlineService headlineService =new NewsHeadlineServiceImpl();


    /**
     * 删除头条业务接口 实现
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void removeByHid(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int hid = Integer.parseInt(req.getParameter("hid"));

        headlineService.removeByHid(hid);


        WebUtil.writeJson(resp,Result.ok(null));
    }

    /**
     * 更新头条的业务接口实现
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */

    protected void update(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        NewsHeadline newsHeadline = WebUtil.readJson(req, NewsHeadline.class);
        headlineService.update(newsHeadline);

        WebUtil.writeJson(resp,Result.ok(null));

    }

    /**
     * 修改头条回显业务接口
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void findHeadlineByHid(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Integer hid = Integer.parseInt(req.getParameter("hid"));
        NewsHeadline headline =headlineService.findByHid(hid);

        Map data =new HashMap();
        data.put("headline",headline);
        WebUtil.writeJson(resp,Result.ok(data));

    }

    /**
     * 发布头条的接口实现
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void publish(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 接收参数
        String token = req.getHeader("token");
        Long userId = JwtHelper.getUserId(token);


        NewsHeadline newsHeadline = WebUtil.readJson(req, NewsHeadline.class);
        newsHeadline.setPublisher(userId.intValue());


        // 将信息存入数据库
        headlineService.addNewsHeadline(newsHeadline);

        WebUtil.writeJson(resp, Result.ok(null));

    }
}
