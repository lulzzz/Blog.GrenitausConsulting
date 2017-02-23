﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Blog.GrenitausConsulting.Domain;
using Blog.GrenitausConsulting.Services.Interfaces;
using Blog.GrenitausConsulting.Web.Api.App_Start;

namespace Blog.GrenitausConsulting.Web.Api.Controllers
{
    public class PostsController : ApiController
    {
        private readonly IPagingService _pagingService;

        public PostsController(IPagingService pagingService)
        {
            _pagingService = pagingService;
        }

        [Route("api/posts/page/{pageNumber}") ]
        public PagedResponse Get(int pageNumber)
        {
            return _pagingService.Get(new PagedCriteria() { PageNumber = pageNumber, PageSize = 10, Posts = Build()});
        }

        private IEnumerable<Post> Build()
        {
            var posts = new List<Post>();
            for (int i = 1; i <= 100; i++)
            {
                posts.Add(new Post()
                {
                    Id = i,
                    Author = "Michael D. Green",
                    PostDate = DateTime.Now.AddDays(-i),
                    Snippet = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.",
                    Title = string.Format("My Great Blog# {0}", i)
                });
            }

            return posts;
        }
    }
}
