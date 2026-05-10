using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IAboutMeService
    {
        Task<IEnumerable<AboutMeDto>> GetAboutMeDtosAsync(CancellationToken ct = default);
        Task<AboutMeDto?> GetAboutMeDtoByIdAsync(int id, CancellationToken ct = default);
        Task<AboutMeDto> CreateAboutMeDtoAsync(AboutMeDto aboutMeDto, CancellationToken ct = default);
        Task<AboutMeDto> UpdateAboutMeDtoAsync(int id, AboutMeDto aboutMeDto, CancellationToken ct = default);
        Task DeleteAboutMeDtoAsync(int id, CancellationToken ct = default);
    }
}
