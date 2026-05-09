namespace MyPortFolio.Server.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
