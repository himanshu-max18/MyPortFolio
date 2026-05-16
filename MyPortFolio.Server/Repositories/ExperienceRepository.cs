using MyPortFolio.Server.Models;
using MyPortFolio.Server.Data;
using MyPortFolio.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MyPortFolio.Server.Repositories
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly PortfolioDbContext _context;
        public ExperienceRepository(PortfolioDbContext context)
        {
            this._context = context;
        }

        public async Task<Experience> CreateExperienceAsync(Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            experience.CreatedAt = DateTime.UtcNow;
            experience.IsActive = true;

            if (experience.IsCurrent)
                experience.EndDate = null;

            await _context.Experiences.AddAsync(experience, ct);
            await _context.SaveChangesAsync(ct);

            return experience;
        }

        public async Task DeleteExperienceAsync(Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            _context.Experiences.Remove(experience);
            await _context.SaveChangesAsync(ct);
        }

        public async Task<Experience?> GetExperienceByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Experiences.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id, ct);
        }

        public async Task<IEnumerable<Experience>> GetExperiencesAsync(CancellationToken ct = default)
        {
            return await _context.Experiences.AsNoTracking().ToListAsync(ct);
        }

        public async Task<Experience> UpdateExperienceAsync(int id, Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            var existingExperience = await GetExperienceByIdAsync(id, ct);
            if (existingExperience == null)
            {
                throw new KeyNotFoundException($"Experience with id {id} not found.");
            }

            existingExperience.Company = experience.Company;
            existingExperience.Role = experience.Role;
            existingExperience.Description = experience.Description;
            existingExperience.StartDate = experience.StartDate;
            existingExperience.EndDate = experience.EndDate;
            existingExperience.IsCurrent = experience.IsCurrent;
            existingExperience.IsActive = experience.IsActive;

            await _context.SaveChangesAsync(ct);
            return existingExperience;
        }
    }
}
