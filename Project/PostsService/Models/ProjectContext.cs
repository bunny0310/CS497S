using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

#nullable disable

namespace Models
{
    public partial class ProjectContext : DbContext
    {
        string ConnectionString { get; set; }

        public ProjectContext(string deploymentMode = null, int shardNumber = 1)
        {
            deploymentMode = deploymentMode ?? SettingsManager.DEVELOPMENT;
            ConnectionString = Util.GenerateDatabaseConnectionString(deploymentMode, shardNumber);
        }

        public ProjectContext(DbContextOptions<ProjectContext> options, string deploymentMode = null, int shardNumber = 1)
            : base(options)
        {
            deploymentMode = deploymentMode ?? SettingsManager.DEVELOPMENT;
            ConnectionString = Util.GenerateDatabaseConnectionString(deploymentMode, shardNumber);
        }

        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                    .UseMySQL(ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>()
                .ToTable("Comment")
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId);

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => new { e.Id })
                    .HasName("PRIMARY");

                entity.ToTable("Post");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.SecretKey).HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
