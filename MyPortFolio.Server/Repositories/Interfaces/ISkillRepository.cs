using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface ISkillRepository
    {
        Task<IEnumerable<Skill>> GetSkillsAsync(CancellationToken ct = default);
        Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(string category, CancellationToken ct = default);
        Task<Skill?> GetSkillByIdAsync(int id, CancellationToken ct = default);
        Task<Skill> CreateSkillAsync(Skill skill, CancellationToken ct = default);
        Task<Skill> UpdateSkillAsync(int id, Skill skill, CancellationToken ct = default);
        Task DeleteSkillAsync(Skill skill, CancellationToken ct = default);
    }
}