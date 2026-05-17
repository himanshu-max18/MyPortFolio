using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface ISkillService
    {
        Task<IEnumerable<SkillDto>> GetSkillDtosAsync(CancellationToken ct = default);
        Task<IEnumerable<SkillDto>> GetSkillDtosByCategoryAsync(string category, CancellationToken ct = default);
        Task<SkillDto?> GetSkillDtoByIdAsync(int id, CancellationToken ct = default);
        Task<SkillDto> CreateSkillDtoAsync(SkillDto skillDto, CancellationToken ct = default);
        Task<SkillDto> UpdateSkillDtoAsync(int id, SkillDto skillDto, CancellationToken ct = default);
        Task DeleteSkillDtoAsync(int id, CancellationToken ct = default);
    }
}