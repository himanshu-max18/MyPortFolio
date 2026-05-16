using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<Experience>> GetExperiencesAsync(CancellationToken ct = default);
        Task<Experience?> GetExperienceByIdAsync(int id, CancellationToken ct = default);
        Task<Experience> CreateExperienceAsync(Experience experience, CancellationToken ct = default);
        Task<Experience> UpdateExperienceAsync(int id, Experience experience, CancellationToken ct = default);
        Task DeleteExperienceAsync(Experience experience, CancellationToken ct = default);
    }
}
