using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Data;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;

namespace MyPortFolio.Server.Repositories
{
    public class EducationRepository : IEducationRepository
    {
        private readonly PortfolioDbContext _context;
        public EducationRepository(PortfolioDbContext context)
        {
            this._context = context;
        }
        public async Task<IEnumerable<Education>> GetEducationAsync(CancellationToken ct = default)
        {
            return await _context.Educations.AsNoTracking().ToListAsync(ct);
        }

        public async Task<Education?> GetEducationByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Educations.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id, ct);
        }

        public async Task<Education> AddEducationAsync(Education education, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(education);
            education.CreatedAt = DateTime.UtcNow;
            education.IsActive = true;

            await _context.Educations.AddAsync(education, ct);
            await _context.SaveChangesAsync(ct);
            return education;
        }

        public async Task<Education> UpdateEducationAsync(Education education, int id, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(education);
            var existingEducation = await GetEducationByIdAsync(id, ct);
            if (existingEducation == null)
            {
                throw new KeyNotFoundException($"Education with id {id} not found.");
            }

            existingEducation.University = education.University;
            existingEducation.Degree = education.Degree;
            existingEducation.FieldOfStudy = education.FieldOfStudy;
            existingEducation.StartYear = education.StartYear;
            existingEducation.EndYear = education.EndYear;
            existingEducation.IsActive = education.IsActive;

            await _context.SaveChangesAsync(ct);
            return existingEducation;
        }

        public async Task DeleteEducationAsync(Education education, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(education);
            _context.Educations.Remove(education);
            await _context.SaveChangesAsync(ct);
        }
    }
}
