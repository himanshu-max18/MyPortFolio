using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class SkillDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? Name { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }
    }
}