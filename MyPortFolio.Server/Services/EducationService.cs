using MyPortFolio.Server.Services.Interfaces;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class EducationService : IEducationService
    {
        private readonly IEducationRepository _educationRepository;
        public EducationService(IEducationRepository educationRepository)
        {
            this._educationRepository = educationRepository;
        }

        public async Task<IEnumerable<EducationDto>> GetEducationDtosAsync(CancellationToken ct = default)
        {
            var educationEntities = await _educationRepository.GetEducationAsync(ct);
            return educationEntities.Select(MapToDto);
        }

        public async Task<EducationDto?> GetEducationDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var educationEntity = await _educationRepository.GetEducationByIdAsync(id, ct);
            if (educationEntity == null)
                return null;
            return MapToDto(educationEntity);
        }

        public async Task<EducationDto> CreateEducationDtoAsync(EducationDto educationDto, CancellationToken ct = default)
        {
            var educationEntity = new Education
            {
                Degree = educationDto.Degree,
                University = educationDto.University,
                FieldOfStudy = educationDto.FieldOfStudy,
                StartYear = educationDto.StartYear,
                EndYear = educationDto.EndYear
            };
            var createdEducationEntity = await _educationRepository.AddEducationAsync(educationEntity, ct);
            return MapToDto(createdEducationEntity);
        }

        public async Task<EducationDto> UpdateEducationDtoAsync(EducationDto educationDto, int id, CancellationToken ct = default)
        {
            var educationEntity = new Education
            {
                Degree = educationDto.Degree,
                University = educationDto.University,
                FieldOfStudy = educationDto.FieldOfStudy,
                StartYear = educationDto.StartYear,
                EndYear = educationDto.EndYear
            };
            var updatedEducationEntity = await _educationRepository.UpdateEducationAsync(educationEntity, id, ct);
            return MapToDto(updatedEducationEntity);
        }

        public async Task DeleteEducationDtoAsync(int id, CancellationToken ct = default)
        {
            var education = await _educationRepository.GetEducationByIdAsync(id, ct);
            if(education == null) { 
                throw new KeyNotFoundException($"Education with id {id} not found.");
            }
            await _educationRepository.DeleteEducationAsync(education, ct);
        }

        private static EducationDto MapToDto(Education education) => new()
        {
            Id = education.Id,
            University = education.University,
            Degree = education.Degree,
            FieldOfStudy = education.FieldOfStudy,
            StartYear = education.StartYear,
            EndYear = education.EndYear,
            IsActive = education.IsActive,
            CreatedAt = education.CreatedAt
        };
    }
}
