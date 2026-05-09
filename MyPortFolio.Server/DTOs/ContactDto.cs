using System.ComponentModel.DataAnnotations;

namespace MyPortFolio.Server.DTOs
{
    public class ContactDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 10)]
        public string? Message { get; set; }
    }
}