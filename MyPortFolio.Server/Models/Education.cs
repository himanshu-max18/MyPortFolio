namespace MyPortFolio.Server.Models
{
    public class Education
    {
        public int Id { get; set; }
        public string? University { get; set; }
        public string? Degree { get; set; }
        public string? FieldOfStudy { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
