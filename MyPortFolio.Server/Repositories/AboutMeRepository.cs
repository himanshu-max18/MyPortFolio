using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace MyPortFolio.Server.Repositories
{
    public class AboutMeRepository : IAboutMeRepository
    {
        private readonly PortfolioDbContext _context;
        public AboutMeRepository(PortfolioDbContext context)
        {
            this._context = context;
        }
        public async Task<IEnumerable<AboutMe>> GetAboutMeAsync(CancellationToken ct = default)
        {
            return await _context.AboutMe.AsNoTracking().ToListAsync(ct);
        }

        public async Task<AboutMe?> GetAboutMeByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.AboutMe.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        }

        public async Task<AboutMe> CreateAboutMeAsync(AboutMe aboutMe, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(aboutMe);
            aboutMe.UpdatedAt = DateTime.UtcNow;

            await _context.AboutMe.AddAsync(aboutMe);
            await _context.SaveChangesAsync(ct);

            return aboutMe;
        }

        public async Task<AboutMe> UpdateAboutMeAsync(AboutMe aboutMe, int id, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(aboutMe);
            var existingAboutMe = await _context.AboutMe.FirstOrDefaultAsync(x => x.Id == id, ct);

            if (existingAboutMe == null)
                throw new KeyNotFoundException($"AboutMe with id {id} not found.");

            existingAboutMe.Tagline = aboutMe.Tagline;
            existingAboutMe.Bio = aboutMe.Bio;
            existingAboutMe.Email = aboutMe.Email;
            existingAboutMe.GitHubUrl = aboutMe.GitHubUrl;
            existingAboutMe.LinkedInUrl = aboutMe.LinkedInUrl;
            existingAboutMe.ResumeUrl = aboutMe.ResumeUrl;

            existingAboutMe.UpdatedAt = DateTime.UtcNow;

            _context.AboutMe.Update(existingAboutMe);
            await _context.SaveChangesAsync(ct);
            return existingAboutMe;
        }

        public async Task DeleteAboutMeAsync(AboutMe aboutMe, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(aboutMe);
            _context.AboutMe.Remove(aboutMe);
            await _context.SaveChangesAsync(ct);
        }
    }
}
