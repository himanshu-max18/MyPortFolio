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
            return educationEntities.Select(e => new EducationDto
            {
                Degree = e.Degree,
                University = e.University,
                FieldOfStudy = e.FieldOfStudy,
                StartYear = e.StartYear,
                EndYear = e.EndYear
            });
        }

        public async Task<EducationDto?> GetEducationDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var educationEntity = await _educationRepository.GetEducationByIdAsync(id, ct);
            if (educationEntity == null)
                return null;
            return new EducationDto
            {
                Degree = educationEntity.Degree,
                University = educationEntity.University,
                FieldOfStudy = educationEntity.FieldOfStudy,
                StartYear = educationEntity.StartYear,
                EndYear = educationEntity.EndYear
            };
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
            return new EducationDto
            {
                Degree = createdEducationEntity.Degree,
                University = createdEducationEntity.University,
                FieldOfStudy = createdEducationEntity.FieldOfStudy,
                StartYear = createdEducationEntity.StartYear,
                EndYear = createdEducationEntity.EndYear
            };
        }

        public async Task UpdateEducationDtoAsync(EducationDto educationDto, int id, CancellationToken ct = default)
        {
            var educationEntity = new Education
            {
                Degree = educationDto.Degree,
                University = educationDto.University,
                FieldOfStudy = educationDto.FieldOfStudy,
                StartYear = educationDto.StartYear,
                EndYear = educationDto.EndYear
            };
            await _educationRepository.UpdateEducationAsync(educationEntity, id, ct);
            var updatedEducationEntity = await _educationRepository.GetEducationByIdAsync(id, ct);

            var updatedEducationDto = new EducationDto
            {
                Degree = updatedEducationEntity?.Degree,
                University = updatedEducationEntity?.University,
                FieldOfStudy = updatedEducationEntity?.FieldOfStudy,
                StartYear = updatedEducationEntity?.StartYear ?? 0,
                EndYear = updatedEducationEntity?.EndYear ?? 0
            };
        }

        public async Task DeleteEducationDtoAsync(int id, CancellationToken ct = default)
        {
            var education = await _educationRepository.GetEducationByIdAsync(id, ct);
            if(education == null) { 
                throw new Exception($"Education with id {id} not found.");
            }
            await _educationRepository.DeleteEducationAsync(education, ct);
        }
    }
}
