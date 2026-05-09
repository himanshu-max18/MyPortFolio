using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? Title { get; set; }

        [Required]
        [StringLength(3000)]
        public string? Description { get; set; }

        [Required]
        [StringLength(200)]
        public string? TechStack { get; set; }

        [Url]
        public string? GitHubUrl { get; set; }

        [Url]
        public string? LiveUrl { get; set; }

        public bool IsFeatured { get; set; }
    }
}