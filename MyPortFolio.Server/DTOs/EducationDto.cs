using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class EducationDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string? University { get; set; }

        [Required]
        [StringLength(100)]
        public string? Degree { get; set; }

        [Required]
        [StringLength(100)]
        public string? FieldOfStudy { get; set; }

        [Range(1950, 2100)]
        public int StartYear { get; set; }

        [Range(1950, 2100)]
        public int EndYear { get; set; }
    }
}