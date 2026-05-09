using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class AboutMeDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string? FullName { get; set; }

        [Required]
        [StringLength(150)]
        public string? Tagline { get; set; }

        [Required]
        [StringLength(1000)]
        public string? Bio { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Url]
        public string? GitHubUrl { get; set; }

        [Url]
        public string? LinkedInUrl { get; set; }

        [Url]
        public string? ResumeUrl { get; set; }
    }
}