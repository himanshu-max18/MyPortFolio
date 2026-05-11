using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IEducationService
    {
        Task<IEnumerable<EducationDto>> GetEducationDtosAsync(CancellationToken ct = default);
        Task<EducationDto?> GetEducationDtoByIdAsync(int id, CancellationToken ct = default);
        Task <EducationDto>CreateEducationDtoAsync(EducationDto educationDto, CancellationToken ct = default);
        Task UpdateEducationDtoAsync(EducationDto educationDto, int id, CancellationToken ct = default);
        Task DeleteEducationDtoAsync(int id, CancellationToken ct = default);
    }
}
