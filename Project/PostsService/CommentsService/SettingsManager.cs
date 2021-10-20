using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace PostsService
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
    }
}
