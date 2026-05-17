using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetProjectDtosAsync(CancellationToken ct = default);
        Task<IEnumerable<ProjectDto>> GetFeaturedProjectDtosAsync(CancellationToken ct = default);
        Task<ProjectDto?> GetProjectDtoByIdAsync(int id, CancellationToken ct = default);
        Task<ProjectDto> CreateProjectDtoAsync(ProjectDto projectDto, CancellationToken ct = default);
        Task<ProjectDto> UpdateProjectDtoAsync(int id, ProjectDto projectDto, CancellationToken ct = default);
        Task DeleteProjectDtoAsync(int id, CancellationToken ct = default);
    }
}