using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IAboutMeRepository
    {
        Task<IEnumerable<AboutMe>> GetAboutMeAsync(CancellationToken ct = default);
        Task<AboutMe?> GetAboutMeByIdAsync(int id, CancellationToken ct = default);
        Task<AboutMe> CreateAboutMeAsync(AboutMe aboutMe, CancellationToken ct = default);
        Task<AboutMe> UpdateAboutMeAsync(AboutMe aboutMe, int id, CancellationToken ct = default);
        Task DeleteAboutMeAsync(AboutMe aboutMe, CancellationToken ct = default);
    }
}
