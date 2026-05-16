using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IExperienceService
    {
        Task<IEnumerable<ExperienceDto>> GetExperienceDtosAsync(CancellationToken ct = default);
        Task<ExperienceDto?> GetExperienceDtoByIdAsync(int id, CancellationToken ct = default);
        Task<ExperienceDto> CreateExperienceDtoAsync(ExperienceDto experienceDto, CancellationToken ct = default);
        Task<ExperienceDto> UpdateExperienceDtoAsync(int id, ExperienceDto experienceDto, CancellationToken ct = default);
        Task DeleteExperienceDtoAsync(int id, CancellationToken ct = default);
    }
}
