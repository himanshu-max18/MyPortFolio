using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class ExperienceService : IExperienceService
    {
        private readonly IExperienceRepository _experienceRepository;

        public ExperienceService(IExperienceRepository experienceRepository)
        {
            _experienceRepository = experienceRepository;
        }

        public async Task<IEnumerable<ExperienceDto>> GetExperienceDtosAsync(CancellationToken ct = default)
        {
            var experiences = await _experienceRepository.GetExperiencesAsync(ct);
            return experiences.Select(MapToDto);
        }

        public async Task<ExperienceDto?> GetExperienceDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var experience = await _experienceRepository.GetExperienceByIdAsync(id, ct);
            return experience == null ? null : MapToDto(experience);
        }

        public async Task<ExperienceDto> CreateExperienceDtoAsync(ExperienceDto experienceDto, CancellationToken ct = default)
        {
            var experience = MapToEntity(experienceDto);

            var created = await _experienceRepository.CreateExperienceAsync(experience, ct);
            return MapToDto(created);
        }

        public async Task<ExperienceDto> UpdateExperienceDtoAsync(int id, ExperienceDto experienceDto, CancellationToken ct = default)
        {
            var experience = MapToEntity(experienceDto);

            var updated = await _experienceRepository.UpdateExperienceAsync(id, experience, ct);
            return MapToDto(updated);
        }

        public async Task DeleteExperienceDtoAsync(int id, CancellationToken ct = default)
        {
            var experience = await _experienceRepository.GetExperienceByIdAsync(id, ct);
            if (experience == null)
            {
                throw new KeyNotFoundException($"Experience with id {id} not found.");
            }

            await _experienceRepository.DeleteExperienceAsync(experience, ct);
        }

        private static ExperienceDto MapToDto(Experience experience) => new()
        {
            Id = experience.Id,
            Company = experience.Company,
            Role = experience.Role,
            Description = experience.Description,
            StartDate = experience.StartDate,
            EndDate = experience.EndDate,
            IsCurrent = experience.IsCurrent,
            IsActive = experience.IsActive,
            CreatedAt = experience.CreatedAt
        };

        private static Experience MapToEntity(ExperienceDto experienceDto) => new()
        {
            Company = experienceDto.Company,
            Role = experienceDto.Role,
            Description = experienceDto.Description,
            StartDate = experienceDto.StartDate,
            EndDate = experienceDto.EndDate,
            IsCurrent = experienceDto.IsCurrent,
            IsActive = experienceDto.IsActive
        };
    }
}