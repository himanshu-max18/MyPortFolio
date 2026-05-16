using MyPortFolio.Server.Data;
using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IEducationRepository
    {
        Task<IEnumerable<Education>> GetEducationAsync(CancellationToken ct = default);
        Task<Education?> GetEducationByIdAsync(int id, CancellationToken ct = default);
        Task<Education> AddEducationAsync(Education education, CancellationToken ct = default);
        Task<Education> UpdateEducationAsync(Education education, int id, CancellationToken ct = default);
        Task DeleteEducationAsync(Education education, CancellationToken ct = default);
    }
}
