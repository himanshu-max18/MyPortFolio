using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Data;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;

namespace MyPortFolio.Server.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly PortfolioDbContext _context;

        public ProjectRepository(PortfolioDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync(CancellationToken ct = default)
        {
            return await _context.Projects.AsNoTracking().ToListAsync(ct);
        }

        public async Task<IEnumerable<Project>> GetFeaturedProjectsAsync(CancellationToken ct = default)
        {
            return await _context.Projects
                .AsNoTracking()
                .Where(p => p.IsFeatured && p.IsActive)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync(ct);
        }

        public async Task<Project?> GetProjectByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id, ct);
        }

        public async Task<Project> CreateProjectAsync(Project project, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(project);

            project.IsActive = true;

            await _context.Projects.AddAsync(project, ct);
            await _context.SaveChangesAsync(ct);

            return project;
        }

        public async Task<Project> UpdateProjectAsync(int id, Project project, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(project);

            var existingProject = await GetProjectByIdAsync(id, ct);

            if (existingProject == null)
                throw new KeyNotFoundException($"Project with id {id} not found.");

            existingProject.Title = project.Title;
            existingProject.Description = project.Description;
            existingProject.TechStack = project.TechStack;
            existingProject.GitHubUrl = project.GitHubUrl;
            existingProject.LiveUrl = project.LiveUrl;
            existingProject.ImageUrl = project.ImageUrl;
            existingProject.IsFeatured = project.IsFeatured;
            existingProject.IsActive = project.IsActive;
            existingProject.UpdatedAt = project.UpdatedAt;

            await _context.SaveChangesAsync(ct);

            return existingProject;
        }

        public async Task DeleteProjectAsync(Project project, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(project);
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync(ct);
        }
    }
}