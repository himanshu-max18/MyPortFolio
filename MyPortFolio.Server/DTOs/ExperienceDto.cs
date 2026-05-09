using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class ExperienceDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? Company { get; set; }

        [Required]
        [StringLength(100)]
        public string? Role { get; set; }

        [Required]
        [StringLength(2000)]
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool IsCurrent { get; set; }
    }
}