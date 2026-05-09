namespace MyPortFolio.Server.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? TechStack { get; set; }
        public string? GitHubUrl { get; set; }
        public string? LiveUrl { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
