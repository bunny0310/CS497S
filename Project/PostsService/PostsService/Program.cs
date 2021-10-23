﻿using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Models;
namespace PostsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine(Util.GenerateDatabaseConnectionString());
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args) 
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseUrls("http://*:5000");
                    webBuilder.UseStartup<Startup>();
                });
    }
}
