using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }
        public DbSet<AboutMe> AboutMe { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
    }
}
