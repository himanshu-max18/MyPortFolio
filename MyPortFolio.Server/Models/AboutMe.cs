namespace MyPortFolio.Server.Models
{
    public class AboutMe
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Tagline { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }
        public string? GitHubUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? ResumeUrl { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
