using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<Experience>> GetExperiencesAsync(CancellationToken ct = default);
        Task<Experience?> GetExperienceByIdAsync(int id, CancellationToken ct = default);
        Task AddExperienceAsync(Experience experience, CancellationToken ct = default);
        Task UpdateExperienceAsync(int id, Experience experience, CancellationToken ct = default);
        Task DeleteExperienceAsync(Experience experience, CancellationToken ct = default);
    }
}
