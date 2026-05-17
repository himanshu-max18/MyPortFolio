using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Data;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;

namespace MyPortFolio.Server.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly PortfolioDbContext _context;

        public SkillRepository(PortfolioDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skill>> GetSkillsAsync(CancellationToken ct = default)
        {
            return await _context.Skills.AsNoTracking().ToListAsync(ct);
        }

        public async Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(string category, CancellationToken ct = default)
        {
            return await _context.Skills
                .AsNoTracking()
                .Where(s => s.Category != null &&
                            s.Category.ToLower() == category.ToLower())
                .OrderBy(s => s.Name)
                .ToListAsync(ct);
        }

        public async Task<Skill?> GetSkillByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Skills.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
        }

        public async Task<Skill> CreateSkillAsync(Skill skill, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(skill);

            skill.CreatedAt = DateTime.UtcNow;
            skill.IsActive = true;

            await _context.Skills.AddAsync(skill, ct);
            await _context.SaveChangesAsync(ct);

            return skill;
        }

        public async Task<Skill> UpdateSkillAsync(int id, Skill skill, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(skill);

            var existingSkill = await _context.Skills
                .FirstOrDefaultAsync(s => s.Id == id, ct);

            if (existingSkill == null)
                throw new KeyNotFoundException($"Skill with id {id} not found.");

            existingSkill.Name = skill.Name;
            existingSkill.Category = skill.Category;
            existingSkill.IsActive = skill.IsActive;

            await _context.SaveChangesAsync(ct);

            return existingSkill;
        }

        public async Task DeleteSkillAsync(Skill skill, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(skill);
            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync(ct);
        }
    }
}