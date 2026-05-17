using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class SkillService : ISkillService
    {
        private readonly ISkillRepository _skillRepository;

        public SkillService(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        public async Task<IEnumerable<SkillDto>> GetSkillDtosAsync(CancellationToken ct = default)
        {
            var skills = await _skillRepository.GetSkillsAsync(ct);
            return skills.Select(MapToDto);
        }

        public async Task<IEnumerable<SkillDto>> GetSkillDtosByCategoryAsync(string category, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(category))
                return Enumerable.Empty<SkillDto>();

            var skills = await _skillRepository.GetSkillsByCategoryAsync(category.Trim(), ct);
            return skills.Select(MapToDto);
        }

        public async Task<SkillDto?> GetSkillDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var skill = await _skillRepository.GetSkillByIdAsync(id, ct);
            return skill == null ? null : MapToDto(skill);
        }

        public async Task<SkillDto> CreateSkillDtoAsync(SkillDto skillDto, CancellationToken ct = default)
        {
            var skill = MapToEntity(skillDto);

            var created = await _skillRepository.CreateSkillAsync(skill, ct);
            return MapToDto(created);
        }

        public async Task<SkillDto> UpdateSkillDtoAsync(int id, SkillDto skillDto, CancellationToken ct = default)
        {
            var skill = MapToEntity(skillDto);

            var updated = await _skillRepository.UpdateSkillAsync(id, skill, ct);
            return MapToDto(updated);
        }

        public async Task DeleteSkillDtoAsync(int id, CancellationToken ct = default)
        {
            var skill = await _skillRepository.GetSkillByIdAsync(id, ct);
            if (skill == null)
                throw new KeyNotFoundException($"Skill with id {id} not found.");
            await _skillRepository.DeleteSkillAsync(skill, ct);
        }

        private static SkillDto MapToDto(Skill skill) => new()
        {
            Id = skill.Id,
            Name = skill.Name,
            Category = skill.Category,
            IsActive = skill.IsActive,
            CreatedAt = skill.CreatedAt
        };

        private static Skill MapToEntity(SkillDto skillDto) => new()
        {
            Name = skillDto.Name,
            Category = skillDto.Category,
            IsActive = skillDto.IsActive
        };
    }
}