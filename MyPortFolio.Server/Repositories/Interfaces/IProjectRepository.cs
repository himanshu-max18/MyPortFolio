using MyPortFolio.Server.Models;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsAsync(CancellationToken ct = default);
        Task<IEnumerable<Project>> GetFeaturedProjectsAsync(CancellationToken ct = default);
        Task<Project?> GetProjectByIdAsync(int id, CancellationToken ct = default);
        Task<Project> CreateProjectAsync(Project project, CancellationToken ct = default);
        Task<Project> UpdateProjectAsync(int id, Project project, CancellationToken ct = default);
        Task DeleteProjectAsync(Project project, CancellationToken ct = default);
    }
}