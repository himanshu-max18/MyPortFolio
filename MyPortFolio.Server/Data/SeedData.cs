using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();

            context.Database.Migrate();

            using var transaction = context.Database.BeginTransaction();

            try
            {
                SeedAboutMe(context);
                SeedContacts(context);
                SeedEducation(context);
                SeedExperience(context);
                SeedProjects(context);
                SeedSkills(context);

                context.SaveChanges();
                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        private static void SeedAboutMe(PortfolioDbContext context) 
        {
            if (!context.AboutMe.Any())
            {
                context.AboutMe.AddRange(
                    new AboutMe
                    {
                        FullName = "Himanshu",
                        Tagline = ".NET Developer",
                        Bio = "Passionate .NET developer focused on building scalable web applications using ASP.NET Core, Entity Framework, and modern frontend technologies.",
                        Email = "your-email@example.com",
                        GitHubUrl = "https://github.com/your-username",
                        LinkedInUrl = "https://www.linkedin.com/in/your-profile",
                        ResumeUrl = "https://your-resume-link.com",
                        UpdatedAt = DateTime.UtcNow
                    }
                );
            }
        }

        private static void SeedContacts(PortfolioDbContext context)
        {
            if (!context.Contacts.Any())
            {
                context.Contacts.AddRange(new Contact
                {
                    Name = "Test User",
                    Email = "testuser@example.com",
                    Message = "Hello Himanshu, I visited your portfolio and really liked your work. Let's connect!",
                    IsRead = false,
                    SentAt = DateTime.UtcNow
                },
                new Contact
                {
                    Name = "Recruiter Demo",
                    Email = "hr@company.com",
                    Message = "We are interested in your .NET profile. Please share your updated resume.",
                    IsRead = false,
                    SentAt = DateTime.UtcNow.AddMinutes(-30)
                });
            }
        }

        private static void SeedEducation(PortfolioDbContext context) 
        {
            if (!context.Educations.Any())
            {
                context.Educations.AddRange(new Education
                {
                    University = "Indira Gandhi National Open University (IGNOU)",
                    Degree = "Bachelor of Computer Applications (BCA)",
                    FieldOfStudy = "School of Computer Sciences",
                    StartYear = 2022,
                    EndYear = 2025,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
            }
        }

        private static void SeedExperience(PortfolioDbContext context) 
        {
            if (!context.Experiences.Any())
            {
                context.Experiences.AddRange(new Experience
                {
                    Company = "Blu Parrot Ventures Private Limited",
                    Role = ".NET Full Stack Developer",
                    Description = "Developed full-stack web applications using ASP.NET Core Web API, Entity Framework Core, and React. Built portfolio projects including CRUD apps, authentication systems, and RESTful APIs.",
                    StartDate = new DateTime(2024, 04, 22),
                    EndDate = null,
                    IsCurrent = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
            }
        }

        private static void SeedProjects(PortfolioDbContext context) 
        { 
            if (!context.Projects.Any())
            {
                context.Projects.AddRange(new Project
                {
                    Title = "Portfolio Website",
                    Description = "Personal portfolio website built using ASP.NET Core Web API and React. Includes About Me, Projects, Experience, and Contact management with admin panel.",
                    TechStack = "ASP.NET Core, Entity Framework Core, React, SQL Server",
                    GitHubUrl = "https://github.com/your-username/portfolio",
                    LiveUrl = "https://your-portfolio-live-url.com",
                    ImageUrl = "https://your-image-url.com/portfolio.png",
                    IsFeatured = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-30),
                    UpdatedAt = DateTime.UtcNow
                });
            }
        }

        private static void SeedSkills(PortfolioDbContext context) 
        {
            if (!context.Skills.Any())
            {
                context.Skills.AddRange(
                    new Skill { Name = "React", Category = "FrontEnd" },
                    new Skill { Name = "HTML/CSS", Category = "FrontEnd" },
                    new Skill { Name = "TailWindCss", Category = "FrontEnd" },
                    new Skill { Name = "Bootstrap", Category = "FrontEnd" },
                    new Skill { Name = "jQuery", Category = "FrontEnd" },
                    new Skill { Name = "C#", Category = "BackEnd" },
                    new Skill { Name = "ASP.NET Core", Category = "BackEnd" },
                    new Skill { Name = "Entity Framework Core", Category = "BackEnd" },
                    new Skill { Name = "LINQ", Category = "BackEnd" },
                    new Skill { Name = "ADO.NET", Category = "BackEnd" },
                    new Skill { Name = "SQL Server", Category = "DataBase" },
                    new Skill { Name = "Git", Category = "Tools" },
                    new Skill { Name = "GitHub", Category = "Tools" },
                    new Skill { Name = "Visual Studio", Category = "Tools" },
                    new Skill { Name = "VS Code", Category = "Tools" },
                    new Skill { Name = "Postman", Category = "Tools" },
                    new Skill { Name = "HTTPie", Category = "Tools" },
                    new Skill { Name = "SQL Server Management Studio", Category = "Tools" }
                );
            }
        }            
    }
}
