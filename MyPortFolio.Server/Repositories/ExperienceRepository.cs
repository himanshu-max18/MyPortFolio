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

        public async Task AddExperienceAsync(Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            await _context.AddAsync(experience, ct);
            await _context.SaveChangesAsync(ct);
        }

        public async Task DeleteExperienceAsync(Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            _context.Remove(experience);
            await _context.SaveChangesAsync(ct);
        }

        public async Task<Experience?> GetExperienceByIdAsync(int id, CancellationToken ct = default)
        {
            var experience = await _context.Experiences.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id, ct);
            ArgumentNullException.ThrowIfNull(experience);
            await _context.SaveChangesAsync(ct); 
            return experience;
        }

        public async Task<IEnumerable<Experience>> GetExperiencesAsync(CancellationToken ct = default)
        {
            return await _context.Experiences.AsNoTracking().ToListAsync(ct);
        }

        public async Task UpdateExperienceAsync(int id, Experience experience, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(experience);
            var existingExperience = await GetExperienceByIdAsync(id, ct);
            if (existingExperience == null)
            {
                throw new ArgumentException($"Experience with id {id} not found.");
            }

            _context.Entry(existingExperience).CurrentValues.SetValues(experience);
            await _context.SaveChangesAsync(ct);
        }
    }
}
