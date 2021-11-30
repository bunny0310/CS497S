﻿using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Models
{
    public static class SettingsManager
    {
        public static IConfiguration AppSetting { get; }
        static SettingsManager()
        {
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
        }

        public readonly static string DEVELOPMENT = "Development";
        public readonly static string PRODUCTION = "Production";
        public readonly static string RUN_MODE = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        public readonly static int NUMBER_SHARDS = int.Parse(Environment.GetEnvironmentVariable("NUMBER_SHARDS"));
    }
}