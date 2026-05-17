using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectDto>> GetProjectDtosAsync(CancellationToken ct = default)
        {
            var projects = await _projectRepository.GetProjectsAsync(ct);
            return projects.Select(MapToDto);
        }

        public async Task<IEnumerable<ProjectDto>> GetFeaturedProjectDtosAsync(CancellationToken ct = default)
        {
            var projects = await _projectRepository.GetFeaturedProjectsAsync(ct);
            return projects.Select(MapToDto);
        }

        public async Task<ProjectDto?> GetProjectDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id, ct);
            return project == null ? null : MapToDto(project);
        }

        public async Task<ProjectDto> CreateProjectDtoAsync(ProjectDto projectDto, CancellationToken ct = default)
        {
            var project = MapToEntity(projectDto);

            var created = await _projectRepository.CreateProjectAsync(project, ct);
            return MapToDto(created);
        }

        public async Task<ProjectDto> UpdateProjectDtoAsync(int id, ProjectDto projectDto, CancellationToken ct = default)
        {
            var project = MapToEntity(projectDto);

            var updated = await _projectRepository.UpdateProjectAsync(id, project, ct);
            return MapToDto(updated);
        }

        public async Task DeleteProjectDtoAsync(int id, CancellationToken ct = default)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id, ct);
            if (project == null)
                throw new KeyNotFoundException($"Project with id {id} not found.");
            await _projectRepository.DeleteProjectAsync(project, ct);   
        }

        private static ProjectDto MapToDto(Project project) => new()
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            TechStack = project.TechStack,
            GitHubUrl = project.GitHubUrl,
            LiveUrl = project.LiveUrl,
            ImageUrl = project.ImageUrl,
            IsFeatured = project.IsFeatured,
            IsActive = project.IsActive,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };

        private static Project MapToEntity(ProjectDto projectDto) => new()
        {
            Title = projectDto.Title,
            Description = projectDto.Description,
            TechStack = projectDto.TechStack,
            GitHubUrl = projectDto.GitHubUrl,
            LiveUrl = projectDto.LiveUrl,
            ImageUrl = projectDto.ImageUrl,
            IsFeatured = projectDto.IsFeatured,
            IsActive = projectDto.IsActive,
            CreatedAt = projectDto.CreatedAt,
            UpdatedAt = projectDto.UpdatedAt
        };
    }
}